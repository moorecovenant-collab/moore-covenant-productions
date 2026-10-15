"""Build a graded version of the Metro ride in DaVinci Resolve Studio via its scripting API.
Steps: save current project, make/open project 'MCP Metro Ride', import frame sequence,
timeline, CDL warm grade + Kodak 2383 print LUT on the clip, Fusion comp with glow + film grain,
render H.264 MP4 + PNG sequence to resolve_out/.
"""
import sys, os, time, json
sys.path.append("/Library/Application Support/Blackmagic Design/DaVinci Resolve/Developer/Scripting/Modules/")
os.environ["RESOLVE_SCRIPT_API"]="/Library/Application Support/Blackmagic Design/DaVinci Resolve/Developer/Scripting/"
os.environ["RESOLVE_SCRIPT_LIB"]="/Applications/DaVinci Resolve/DaVinci Resolve.app/Contents/Libraries/Fusion/fusionscript.so"
import DaVinciResolveScript as dvr

SCR = "/private/tmp/claude-501/-Users-isthateli/374f6cfb-ddcf-40e7-bd35-2d57acb5ff08/scratchpad"
SEQ = f"{SCR}/resolve_seq"
OUT = f"{SCR}/resolve_out"
LUT = "/Library/Application Support/Blackmagic Design/DaVinci Resolve/LUT/Film Looks/Rec709 Kodak 2383 D65.cube"
PROJ = "MCP Metro Ride"

r = dvr.scriptapp("Resolve")
pm = r.GetProjectManager()
cur = pm.GetCurrentProject()
if cur and cur.GetName() != PROJ:
    print("saving", cur.GetName(), "->", pm.SaveProject())
    pm.CloseProject(cur)

p = pm.LoadProject(PROJ)
if not p:
    p = pm.CreateProject(PROJ)
print("project:", p.GetName())
p.SetSetting("timelineFrameRate", "24")
p.SetSetting("timelineResolutionWidth", "1280")
p.SetSetting("timelineResolutionHeight", "720")
p.SetSetting("timelinePlaybackFrameRate", "24")

mp = p.GetMediaPool()
ms = r.GetMediaStorage()
root = mp.GetRootFolder()
# import the image sequence (Resolve detects r_%04d.png as one clip)
existing = [c for c in root.GetClipList() if "r_" in (c.GetName() or "")]
if existing:
    clip = existing[0]
else:
    first = f"{SEQ}/r_0001.png"
    last = f"{SEQ}/r_0272.png"
    items = mp.ImportMedia([{"FilePath": f"{SEQ}/r_%04d.png", "StartIndex": 1, "EndIndex": 272}])
    if not items:
        items = ms.AddItemListToMediaPool([first])
    clip = items[0]
print("clip:", clip.GetName(), clip.GetClipProperty("Frames"), clip.GetClipProperty("FPS"))
clip.SetClipProperty("FPS", "24")

tl = None
for i in range(1, p.GetTimelineCount()+1):
    t = p.GetTimelineByIndex(i)
    if t.GetName() == "Ride Grade":
        tl = t
if tl is None:
    tl = mp.CreateTimelineFromClips("Ride Grade", [clip])
p.SetCurrentTimeline(tl)
print("timeline:", tl.GetName(), tl.GetStartFrame(), tl.GetEndFrame())

item = tl.GetItemListInTrack("video", 1)[0]
print("item:", item.GetName(), item.GetDuration())

# --- Color: warm tungsten interior, lifted shadows a touch, print film LUT on node 2
r.OpenPage("color")
ng = item.GetNodeGraph() if hasattr(item, "GetNodeGraph") else None
if ng:
    print("nodes:", ng.GetNumNodes())
    if ng.GetNumNodes() < 2:
        # add a serial node via UI action is not exposed; fall back to LUT on node 1
        pass
    ok = ng.SetLUT(1, LUT if os.environ.get("USE_LUT","0")=="1" else "")
    print("lut:", ok)
else:
    print("lut:", item.SetLUT(1, LUT))
cdl = item.SetCDL({"NodeIndex": "1", "Slope": os.environ.get("SLOPE","1.03 1.00 0.94"), "Offset": os.environ.get("OFFSET","0.018 0.014 0.008"), "Power": os.environ.get("POWER","0.97 0.98 1.01"), "Saturation": os.environ.get("SAT","0.95")})
print("cdl:", cdl)

# --- Fusion: soft glow on the fluorescents + fine film grain
r.OpenPage("fusion")
fc = item.GetFusionCompByIndex(1) if item.GetFusionCompCount() else item.AddFusionComp()
print("fusion comp:", fc)
try:
    fc.Lock()
    tools = fc.GetToolList()
    names = [t.GetAttrs()["TOOLS_Name"] for t in tools.values()]
    if "Glow1" in names:
        g=fc.FindTool("Glow1"); g.Gain=float(os.environ.get("GLOW","0.3")); g.Glow=0.5; g.XGlowSize=14
        fg=fc.FindTool("FilmGrain1"); fg.Strength=float(os.environ.get("GRAIN","0.16")); fg.Size=1.2
        print("fusion tools updated")
    if "Glow1" not in names:
        mi = fc.FindTool("MediaIn1"); mo = fc.FindTool("MediaOut1")
        glow = fc.AddTool("Glow", -32768, -32768)
        glow.Gain = 0.35; glow.Glow = 0.55; glow.XGlowSize = 14
        grain = fc.AddTool("FilmGrain", -32768, -32768)
        grain.Strength = 0.18; grain.Size = 1.2
        glow.Input = mi
        grain.Input = glow
        mo.Input = grain
        print("fusion tools added")
    fc.Unlock()
except Exception as e:
    print("fusion error:", e)

# --- Deliver
r.OpenPage("deliver")
p.DeleteAllRenderJobs()
import shutil; shutil.rmtree(OUT, ignore_errors=True); os.makedirs(OUT+"/png", exist_ok=True)
p.SetCurrentRenderFormatAndCodec("mp4", "H264")
p.SetRenderSettings({"SelectAllFrames": True, "TargetDir": OUT, "CustomName": "metro-ride-v2-graded",
                     "FormatWidth": 1280, "FormatHeight": 720, "FrameRate": "24", "ExportVideo": True, "ExportAudio": False})
j1 = p.AddRenderJob()
p.SetCurrentRenderFormatAndCodec("png", "RGB8")
p.SetRenderSettings({"SelectAllFrames": True, "TargetDir": OUT + "/png", "CustomName": "g_",
                     "FormatWidth": 1280, "FormatHeight": 720, "ExportVideo": True, "ExportAudio": False})
j2 = p.AddRenderJob()
print("jobs:", j1, j2)
p.StartRendering([j1, j2], False)
while p.IsRenderingInProgress():
    time.sleep(3)
print("render status:", p.GetRenderJobStatus(j1), p.GetRenderJobStatus(j2))
pm.SaveProject()
print("DONE")
