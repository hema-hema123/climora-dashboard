import os
import shutil
import zipfile
import xml.etree.ElementTree as ET

# Base working directory
build_dir = '/Users/bsudh/climora/climora-dashboard/intelliclass_build'
if os.path.exists(build_dir):
    shutil.rmtree(build_dir)
os.makedirs(build_dir, exist_ok=True)

# 1. Initialize PPTX directory structure
for sub in ['_rels', 'docProps', 'ppt', 'ppt/_rels', 'ppt/media', 'ppt/slideLayouts', 'ppt/slideLayouts/_rels', 'ppt/slideMasters', 'ppt/slideMasters/_rels', 'ppt/slides', 'ppt/slides/_rels', 'ppt/theme']:
    os.makedirs(os.path.join(build_dir, sub), exist_ok=True)

# Copy college logo to media
media_dir = os.path.join(build_dir, 'ppt/media')
shutil.copyfile('/Users/bsudh/climora/climora-dashboard/public/college-logo.jpg', os.path.join(media_dir, 'college_logo.jpg'))

# Create [Content_Types].xml
ct_xml = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Default Extension="jpg" ContentType="image/jpeg"/>
  <Default Extension="jpeg" ContentType="image/jpeg"/>
  <Default Extension="png" ContentType="image/png"/>
  <Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>
  <Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>
  <Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>
  <Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>
"""
for i in range(1, 25):
    ct_xml += f'  <Override PartName="/ppt/slides/slide{i}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>\n'
ct_xml += "</Types>"

with open(os.path.join(build_dir, '[Content_Types].xml'), 'w', encoding='utf-8') as f:
    f.write(ct_xml)

# Create _rels/.rels
with open(os.path.join(build_dir, '_rels/.rels'), 'w', encoding='utf-8') as f:
    f.write("""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/>
</Relationships>""")

# Create theme1.xml (Modern Deep Slate & Electric Indigo Theme)
with open(os.path.join(build_dir, 'ppt/theme/theme1.xml'), 'w', encoding='utf-8') as f:
    f.write("""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="DeepSlateIndigo">
  <a:themeElements>
    <a:clrScheme name="SlateIndigo">
      <a:dk1><a:srgbClr val="0B1120"/></a:dk1>
      <a:lt1><a:srgbClr val="FFFFFF"/></a:lt1>
      <a:dk2><a:srgbClr val="1E293B"/></a:dk2>
      <a:lt2><a:srgbClr val="F8FAFC"/></a:lt2>
      <a:accent1><a:srgbClr val="6366F1"/></a:accent1>
      <a:accent2><a:srgbClr val="38BDF8"/></a:accent2>
      <a:accent3><a:srgbClr val="10B981"/></a:accent3>
      <a:accent4><a:srgbClr val="F59E0B"/></a:accent4>
      <a:accent5><a:srgbClr val="EC4899"/></a:accent5>
      <a:accent6><a:srgbClr val="8B5CF6"/></a:accent6>
      <a:hlink><a:srgbClr val="38BDF8"/></a:hlink>
      <a:folHlink><a:srgbClr val="818CF8"/></a:folHlink>
    </a:clrScheme>
    <a:fontScheme name="ModernSans">
      <a:majorFont><a:latin typeface="Segoe UI Semibold"/></a:majorFont>
      <a:minorFont><a:latin typeface="Segoe UI"/></a:minorFont>
    </a:fontScheme>
    <a:fmtScheme name="Office">
      <a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:fillStyleLst>
      <a:lnStyleLst><a:ln w="9525"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln></a:lnStyleLst>
      <a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle></a:effectStyleLst>
      <a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:bgFillStyleLst>
    </a:fmtScheme>
  </a:themeElements>
</a:theme>""")

# Create slideMaster1.xml and rels
with open(os.path.join(build_dir, 'ppt/slideMasters/slideMaster1.xml'), 'w', encoding='utf-8') as f:
    f.write("""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld>
    <p:bg><p:bgPr><a:solidFill><a:srgbClr val="080D1A"/></a:solidFill></p:bgPr></p:bg>
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>
    </p:spTree>
  </p:cSld>
  <p:clrMap bg1="dk1" tx1="lt1" bg2="dk2" tx2="lt2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>
  <p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst>
</p:sldMaster>""")

with open(os.path.join(build_dir, 'ppt/slideMasters/_rels/slideMaster1.xml.rels'), 'w', encoding='utf-8') as f:
    f.write("""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="../theme/theme1.xml"/>
</Relationships>""")

# Create slideLayout1.xml and rels
with open(os.path.join(build_dir, 'ppt/slideLayouts/slideLayout1.xml'), 'w', encoding='utf-8') as f:
    f.write("""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldLayout xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" type="blank" preserve="1">
  <p:cSld name="Blank">
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>
    </p:spTree>
  </p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sldLayout>""")

with open(os.path.join(build_dir, 'ppt/slideLayouts/_rels/slideLayout1.xml.rels'), 'w', encoding='utf-8') as f:
    f.write("""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="../slideMasters/slideMaster1.xml"/>
</Relationships>""")

print("[+] PPT base files initialized")

# Slide Generator Helper Function for Modern Deep Slate Theme
def xml_esc(text):
    text = str(text).replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')
    return text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

def build_slide_xml(slide_num, section_name, slide_title, left_box_title, left_bullets, right_box_title, right_bullets, accent_color="6366F1", sec_color="38BDF8"):
    # Convert bullets to XML paragraphs
    def make_paragraphs(bullets):
        out = ""
        for b in bullets:
            out += f"""<a:p>
              <a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr>
              <a:r>
                <a:rPr lang="en-US" sz="1350"><a:solidFill><a:srgbClr val="E2E8F0"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr>
                <a:t>{xml_esc(b)}</a:t>
              </a:r>
            </a:p>"""
        return out

    left_ps = make_paragraphs(left_bullets)
    right_ps = make_paragraphs(right_bullets)

    xml = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld name="Slide {slide_num}">
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>
      
      <!-- Modern Slate Gradient Background -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="2" name="SlideBg"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="0" y="0"/><a:ext cx="12192000" cy="6858000"/></a:xfrm>
          <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
          <a:gradFill>
            <a:gsLst>
              <a:gs pos="0"><a:srgbClr val="0F172A"/></a:gs>
              <a:gs pos="60000"><a:srgbClr val="090D1A"/></a:gs>
              <a:gs pos="100000"><a:srgbClr val="040711"/></a:gs>
            </a:gsLst>
            <a:lin ang="5400000"/>
          </a:gradFill>
        </p:spPr>
      </p:sp>

      <!-- Top Section Pill -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="3" name="SectionPill"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="685800" y="380000"/><a:ext cx="4200000" cy="320000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 50000"/></a:avLst></a:prstGeom>
          <a:solidFill><a:srgbClr val="1E293B"/></a:solidFill>
          <a:ln w="12700"><a:solidFill><a:srgbClr val="{sec_color}"/></a:solidFill></a:ln>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="100000" tIns="0" rIns="100000" bIns="0" anchor="ctr"/>
          <a:lstStyle/>
          <a:p>
            <a:r>
              <a:rPr lang="en-US" sz="1100" b="1"><a:solidFill><a:srgbClr val="{sec_color}"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr>
              <a:t>{xml_esc(section_name.upper())}</a:t>
            </a:r>
          </a:p>
        </p:txBody>
      </p:sp>

      <!-- Slide Title & Number -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="4" name="SlideTitle"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr><a:xfrm><a:off x="685800" y="780000"/><a:ext cx="10820400" cy="620000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln/></p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="0" tIns="0" rIns="0" bIns="0" anchor="ctr"/>
          <a:lstStyle/>
          <a:p>
            <a:r>
              <a:rPr lang="en-US" sz="2600" b="1"><a:solidFill><a:srgbClr val="{accent_color}"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr>
              <a:t>{slide_num:02d}. </a:t>
            </a:r>
            <a:r>
              <a:rPr lang="en-US" sz="2600" b="1"><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr>
              <a:t>{xml_esc(slide_title)}</a:t>
            </a:r>
          </a:p>
        </p:txBody>
      </p:sp>

      <!-- Left Content Card -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="5" name="LeftCard"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="685800" y="1550000"/><a:ext cx="5250000" cy="4850000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 2800"/></a:avLst></a:prstGeom>
          <a:solidFill><a:srgbClr val="131D31"/></a:solidFill>
          <a:ln w="19050"><a:solidFill><a:srgbClr val="{accent_color}"/></a:solidFill></a:ln>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="250000" tIns="240000" rIns="250000" bIns="240000" anchor="t"/>
          <a:lstStyle/>
          <a:p>
            <a:r>
              <a:rPr lang="en-US" sz="1650" b="1"><a:solidFill><a:srgbClr val="{accent_color}"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr>
              <a:t>{xml_esc(left_box_title)}</a:t>
            </a:r>
          </a:p>
          <a:p><a:endParaRPr sz="600"/></a:p>
          {left_ps}
        </p:txBody>
      </p:sp>

      <!-- Right Content Card -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="6" name="RightCard"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="6256200" y="1550000"/><a:ext cx="5250000" cy="4850000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 2800"/></a:avLst></a:prstGeom>
          <a:solidFill><a:srgbClr val="131D31"/></a:solidFill>
          <a:ln w="19050"><a:solidFill><a:srgbClr val="334155"/></a:solidFill></a:ln>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="250000" tIns="240000" rIns="250000" bIns="240000" anchor="t"/>
          <a:lstStyle/>
          <a:p>
            <a:r>
              <a:rPr lang="en-US" sz="1650" b="1"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr>
              <a:t>{xml_esc(right_box_title)}</a:t>
            </a:r>
          </a:p>
          <a:p><a:endParaRPr sz="600"/></a:p>
          {right_ps}
        </p:txBody>
      </p:sp>

    </p:spTree>
  </p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sld>"""

    rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
</Relationships>"""
    return xml, rels


# Definition of all 24 slides exactly matching the user's uploaded tables:
intelliclass_slides = [
    # SLIDE 1: Title Slide
    {"custom": "title"},

    # SLIDE 2: Abstract
    {
        "sec": "Section 1: Introduction and Problem Definition",
        "title": "Abstract",
        "left_title": "Project Overview & Major Features",
        "left_bullets": [
            "Project Overview: IntelliClass AI is an autonomous, interactive virtual classroom platform converting academic course documents into live 3D lectures.",
            "Major Features: Multimodal document understanding (RAG), autonomous pedagogical script synthesis, ultra-fast neural speech, and real-time student Q&A.",
            "3D Virtual Classroom: Replaces heavy video streaming with client-side WebGL avatar animation, enabling interactive lectures even under 150 kbps bandwidth."
        ],
        "right_title": "Technologies Used & Expected Outcome",
        "right_bullets": [
            "Technologies Used: Next.js 15, React 19, FastAPI, Google Gemini 1.5 Pro, Kokoro-82M TTS, Supabase PostgreSQL, pgvector, and Three.js / WebGL.",
            "Document-Grounded Precision: High-accuracy semantic retrieval anchors all teacher responses to syllabus textbooks with zero hallucinations.",
            "Expected Outcome: A fully autonomous, low-bandwidth, interactive teaching assistant democratizing high-quality academic tutoring for universities."
        ],
        "accent": "6366F1", "sec_color": "818CF8"
    },

    # SLIDE 3: Introduction
    {
        "sec": "Section 1: Introduction and Problem Definition",
        "title": "Introduction",
        "left_title": "AI-Powered Virtual Classroom & Automated Teaching",
        "left_bullets": [
            "AI-Powered Virtual Classroom: Transforms online education from static video viewing into an immersive, responsive classroom environment.",
            "Automated Teaching Engine: Ingests syllabus PDFs and autonomously produces structured pedagogical lectures with natural spoken delivery.",
            "3D Pedagogical Avatar: An expressive digital professor that delivers lectures with synchronized lip movement, head tracking, and teaching gestures."
        ],
        "right_title": "Interactive Learning Environment",
        "right_bullets": [
            "Interactive Learning: Students can pause the lecture, raise their hands, ask spoken or text doubts, and receive instant grounded explanations.",
            "Synchronized Blackboard: Dynamic digital board displaying real-time code snippets, formulas, and diagrams aligned with speech.",
            "24/7 Educational Accessibility: Empowers students to learn at their own pace with personalized step-by-step guidance."
        ],
        "accent": "6366F1", "sec_color": "818CF8"
    },

    # SLIDE 4: Problem Statement
    {
        "sec": "Section 1: Introduction and Problem Definition",
        "title": "Problem Statement",
        "left_title": "Limitations of Traditional Online Learning",
        "left_bullets": [
            "Severe Bandwidth Demands: Video conferencing (Zoom/Meet) requires 2-4 Mbps, causing severe buffering and dropouts in rural areas.",
            "High Production Overhead: High-quality educational videos require expensive studio equipment, recording setups, and extensive editing.",
            "Static, Outdated Curricula: Updating syllabus content requires re-recording entire video series from scratch.",
            "Passive Disengagement: Pre-recorded MOOCs suffer from low student engagement and completion rates below 10%."
        ],
        "right_title": "Lack of Integrated Intelligent Teaching",
        "right_bullets": [
            "Fragmented Learning Tools: Students must switch between separate video players, static PDF notes, and external chatbot tabs.",
            "Unscalable Human Tutoring: Professors cannot provide immediate, 24/7 personalized answers to hundreds of individual students.",
            "Hallucination Risks: Generic public LLMs hallucinate inaccurate concepts rather than adhering strictly to accredited university textbooks."
        ],
        "accent": "F43F5E", "sec_color": "FB7185"
    },

    # SLIDE 5: Motivation
    {
        "sec": "Section 1: Introduction and Problem Definition",
        "title": "Motivation",
        "left_title": "Need for Personalized Learning & Automated Lectures",
        "left_bullets": [
            "Need for Personalized Learning: Every student learns at a different pace and requires customized examples, analogies, and pacing.",
            "Need for Automated Lectures: Eliminates manual video recording by allowing institutions to generate complete lectures directly from course notes.",
            "Democratizing Quality Education: Bridges the educational divide by making top-tier tutoring accessible to every university student."
        ],
        "right_title": "Low-Bandwidth Communication & Interactive Teaching",
        "right_bullets": [
            "Need for Low-Bandwidth Communication: Transmitting animation transform coordinates instead of video reduces data usage by 95% (<150 kbps).",
            "Need for Interactive Teaching: Combines the visual presence of a real professor with live question answering and dynamic lecture interruption.",
            "Bridging Tier-2/3 Divide: Enables students in low-connectivity regions to experience high-definition virtual classrooms without fiber internet."
        ],
        "accent": "38BDF8", "sec_color": "7DD3FC"
    },

    # SLIDE 6: Objectives
    {
        "sec": "Section 1: Introduction and Problem Definition",
        "title": "Objectives",
        "left_title": "Core Technical Objectives",
        "left_bullets": [
            "Document-Based Learning: Ingest and process academic PDFs, structuring content into semantic chunks for vector retrieval.",
            "Automatic Lecture Generation: Autonomously generate conversational lecture scripts with pedagogical transitions and slide cues using Gemini.",
            "3D Avatar & Synchronized Speech: Deliver real-time WebGL humanoid animation with millisecond-level phoneme lip-sync via Kokoro-82M TTS.",
            "Real-Time Q&A Engine: Enable instant doubt resolution with exact textbook citations and minimal latency."
        ],
        "right_title": "Platform & Delivery Objectives",
        "right_bullets": [
            "Lecture Interruption Protocol: Seamlessly handle student 'raise hand' events, pause speech, answer doubts, and resume the lecture.",
            "Document-Grounded Answers: Ensure 100% hallucination-free teaching anchored strictly to uploaded course materials.",
            "Cross-Platform Browser Delivery: Provide a zero-install WebGL experience accessible on any standard laptop, tablet, or smartphone."
        ],
        "accent": "10B981", "sec_color": "34D399"
    },

    # SLIDE 7: Existing System
    {
        "sec": "Section 2: Existing and Proposed Systems",
        "title": "Existing System",
        "left_title": "Current EdTech & Video Platforms",
        "left_bullets": [
            "Video Conferencing Platforms: Zoom, Google Meet, and Microsoft Teams used for live remote lectures.",
            "LMS Platforms: Moodle, Canvas, Blackboard, and Google Classroom used for syllabus document distribution and assignments.",
            "RAG Tools: Standalone document question-answering systems (e.g., NotebookLM, ChatPDF) offering text-only chat interfaces.",
            "Avatar Services: Commercial video synthesis platforms (e.g., Synthesia, HeyGen, D-ID) generating pre-rendered video clips."
        ],
        "right_title": "Workflow in Existing Platforms",
        "right_bullets": [
            "Manual Video Recording: Instructors record hours of video footage, requiring manual editing, encoding, and cloud storage.",
            "Passive Viewing Experience: Students watch pre-recorded MP4 streams with zero mid-stream interactive verbal interruption.",
            "Disconnected Tools: Doubts must be typed in separate discussion forums or text chatbots with hours or days of delay."
        ],
        "accent": "F59E0B", "sec_color": "FBBF24"
    },

    # SLIDE 8: Limitations of Existing System
    {
        "sec": "Section 2: Existing and Proposed Systems",
        "title": "Limitations of Existing System",
        "left_title": "Functional & Pedagogical Limitations",
        "left_bullets": [
            "Limited RAG Integration: Commercial avatar services have no native connection to course vector stores or syllabus textbooks.",
            "No Automatic Lecture Generation: Existing tools require instructors to manually write every script sentence word-for-word.",
            "Lack of 3D Avatars: Platforms output pre-rendered MP4 video files rather than real-time interactive 3D WebGL meshes.",
            "High Cloud Rendering Costs: Pre-rendering synthetic video takes minutes per clip and incurs expensive cloud GPU subscription costs."
        ],
        "right_title": "Bandwidth and Synchronization Limitations",
        "right_bullets": [
            "Bandwidth Limitations: Streaming video requires 2-4 Mbps continuous bandwidth, failing in rural and low-connectivity regions.",
            "Synchronization Limitations: Audio, video, and presentation slides easily fall out of sync over lossy network connections.",
            "Zero Dynamic Interactivity: Impossible for a student to stop a pre-rendered video avatar, ask a doubt, and receive an instant spoken answer."
        ],
        "accent": "F43F5E", "sec_color": "FB7185"
    },

    # SLIDE 9: Proposed System
    {
        "sec": "Section 2: Existing and Proposed Systems",
        "title": "Proposed System (IntelliClass AI)",
        "left_title": "Architecture Combining AI, RAG & TTS",
        "left_bullets": [
            "Holistic System Integration: IntelliClass AI seamlessly combines AI, RAG, TTS, 3D avatars and real-time interaction into one platform.",
            "Document-Grounded RAG: Parses course PDFs using PyMuPDF and pgvector, ensuring all teaching points are factually accurate.",
            "Neural Speech Synthesis (TTS): Kokoro-82M generates expressive audio and precise phoneme timestamps in real time."
        ],
        "right_title": "Real-Time 3D Avatars & Interaction",
        "right_bullets": [
            "Real-Time 3D Avatars: Renders humanoid professors natively in the browser via Three.js / WebGL with 52 facial blendshapes.",
            "Dynamic Real-Time Interaction: Students can interrupt the lecture at any moment; the avatar stops, answers with citations, and resumes.",
            "Ultra-Low Bandwidth Delivery: Transmits lightweight voice audio and facial morph parameters (~115 kbps), saving 95% bandwidth."
        ],
        "accent": "10B981", "sec_color": "34D399"
    },

    # SLIDE 10: Advantages and Scope
    {
        "sec": "Section 2: Existing and Proposed Systems",
        "title": "Advantages and Scope",
        "left_title": "Platform Advantages",
        "left_bullets": [
            "Automated Lectures: Transforms syllabus textbooks into full-length interactive lectures with zero studio recording effort.",
            "Document-Grounded Answers: Eliminates AI hallucinations by grounding all explanations strictly in accredited course PDFs.",
            "Low-Bandwidth Delivery: Enables high-fidelity interactive education on 2G/3G networks requiring only ~115 kbps.",
            "Interactive Learning: Active student participation through instant voice Q&A, slide synchronization, and adaptive pacing."
        ],
        "right_title": "Project Scope & Applications",
        "right_bullets": [
            "University Education: Scalable autonomous teaching assistants for introductory engineering and science courses.",
            "Rural & Distance Education: Delivering high-quality visual classroom teaching to remote colleges lacking specialized faculty.",
            "Corporate Training: Instant conversion of standard operating procedures (SOPs) and manuals into interactive training sessions."
        ],
        "accent": "38BDF8", "sec_color": "7DD3FC"
    },

    # SLIDE 11: Hardware and Software Requirements
    {
        "sec": "Section 3: Requirements and System Design",
        "title": "Hardware and Software Requirements",
        "left_title": "Hardware Requirements",
        "left_bullets": [
            "Processor: Multi-core 64-bit Processor (Intel Core i5/i7 8th Gen+ or Apple Silicon M1/M2/M3).",
            "RAM & Storage: 16 GB RAM recommended for development server; minimum 4 GB RAM for client student devices.",
            "Network Bandwidth: Minimum 150 kbps stable internet connection (optimized for low-connectivity environments).",
            "Audio Peripherals: Standard microphone and speakers/headphones for interactive voice Q&A."
        ],
        "right_title": "Software Requirements, Frameworks & Services",
        "right_bullets": [
            "Operating System: Windows 11 / macOS Sonoma / Ubuntu Linux 22.04 LTS.",
            "Development Tools & Runtimes: Node.js v20.x, Python 3.11+, VS Code, Git version control.",
            "Frameworks: Next.js 15 (App Router), React 19, FastAPI, Uvicorn ASGI Server, Three.js, React Three Fiber.",
            "Cloud Services & APIs: Supabase (PostgreSQL 15, pgvector, Realtime WebSockets), Google Gemini 1.5 Pro API."
        ],
        "accent": "6366F1", "sec_color": "818CF8"
    },

    # SLIDE 12: Technology Stack
    {
        "sec": "Section 3: Requirements and System Design",
        "title": "Technology Stack",
        "left_title": "Frontend & 3D WebGL Technologies",
        "left_bullets": [
            "Next.js & React: Next.js 15 with React 19 for server-rendered layouts, responsive UI, and client-side state management.",
            "Three.js and React Three Fiber: Hardware-accelerated 3D WebGL rendering pipeline driving 60 FPS humanoid avatars.",
            "ReadyPlayerMe & glTF: Rigged humanoid avatar models featuring 52 standard ARKit facial morph targets and blendshapes.",
            "Tailwind CSS & Lucide: Modern slate UI styling with responsive components and intuitive icons."
        ],
        "right_title": "Backend, AI & Database Technologies",
        "right_bullets": [
            "FastAPI: Asynchronous high-performance Python microservices orchestrating RAG, document parsing, and audio pipelines.",
            "Gemini: Google Gemini 1.5 Pro for contextual lecture script synthesis and document-grounded question answering.",
            "Kokoro-82M: Lightweight 82M open-weight neural TTS delivering rapid speech synthesis with phoneme-level timestamp generation.",
            "Supabase, PostgreSQL and pgvector: 768-dimensional dense vector indexing and real-time WebSocket state synchronization."
        ],
        "accent": "38BDF8", "sec_color": "7DD3FC"
    },

    # SLIDE 13: System Architecture
    {
        "sec": "Section 3: Requirements and System Design",
        "title": "System Architecture",
        "left_title": "Tiered Architecture: Frontend, AI Backend & Supabase",
        "left_bullets": [
            "Complete Architecture Overview: Seamlessly integrates Frontend, AI Backend, HeadTTS, Supabase and 3D Avatar.",
            "Frontend (Next.js 15): Client dashboard, Three.js 3D canvas, audio player, blackboard renderer, and WebSocket manager.",
            "AI Backend (FastAPI): PyMuPDF text extractor, TikToken chunker, Gemini 1.5 script generator, and RAG coordinator.",
            "Supabase Platform: PostgreSQL relational storage, pgvector vector search, Auth JWT validation, and Realtime channels."
        ],
        "right_title": "HeadTTS & 3D Avatar Rendering Pipeline",
        "right_bullets": [
            "HeadTTS Service: Dedicated speech generation microservice converting script chunks into 24kHz audio and viseme queues.",
            "3D Avatar Engine: Client-side Three.js engine executing blendshape morphing and inverse kinematics at 60 FPS.",
            "Real-Time Event Loop: Low-latency WebSockets synchronize slide advancement, avatar speech, and student interruption events."
        ],
        "accent": "10B981", "sec_color": "34D399"
    },

    # SLIDE 14: Microservices and Integration
    {
        "sec": "Section 3: Requirements and System Design",
        "title": "Microservices and Integration",
        "left_title": "Next.js, FastAPI and HeadTTS Responsibilities",
        "left_bullets": [
            "Next.js Responsibilities: Handles UI rendering, user session management, Three.js WebGL canvas, and audio playback synchronization.",
            "FastAPI Responsibilities: Manages PDF parsing, semantic chunking, vector embeddings, Gemini RAG pipelines, and course endpoints.",
            "HeadTTS Responsibilities: Converts lecture paragraphs into synthesized speech audio, computing exact phoneme start and end times."
        ],
        "right_title": "Communication Between Services",
        "right_bullets": [
            "RESTful API Communication: Asynchronous HTTP/JSON endpoints connect Next.js and FastAPI for document processing and course creation.",
            "Binary Audio Streaming: FastAPI and HeadTTS stream synthesized WAV/MP3 audio buffers directly to client audio players.",
            "Supabase Realtime WebSockets: Sub-100ms bidirectional event bus coordinating lecture playback clocks and student Q&A."
        ],
        "accent": "6366F1", "sec_color": "818CF8"
    },

    # SLIDE 15: System Workflow
    {
        "sec": "Section 3: Requirements and System Design",
        "title": "System Workflow",
        "left_title": "PDF Upload to RAG Indexing Pipeline",
        "left_bullets": [
            "PDF Upload: Instructor uploads academic syllabus notes or textbook chapters through the Next.js dashboard.",
            "Text Extraction: PyMuPDF parses raw text, cleans formatting, and extracts structured chapter headings.",
            "Chunking: TikToken tokenizer segments extracted text into 512-token chunks with 50-token semantic overlap.",
            "Embeddings: Google text-embedding-004 generates 768-dimensional dense vector embeddings stored in pgvector.",
            "RAG Indexing: Cosine similarity vector index enables instantaneous semantic retrieval for lecture synthesis."
        ],
        "right_title": "Lecture Generation, Speech & Avatar Playback",
        "right_bullets": [
            "Lecture Generation: Gemini 1.5 synthesizes conversational lecture scripts with integrated slide presentation cues.",
            "Speech Synthesis: Kokoro-82M neural TTS generates high-quality speech audio and extracts phoneme timestamps.",
            "Avatar Playback: Client-side Three.js engine maps visemes to facial morph targets, animating the 3D professor in real time.",
            "Interactive Q&A Loop: Student questions trigger instant vector search, delivering document-grounded answers mid-lecture."
        ],
        "accent": "10B981", "sec_color": "34D399"
    },

    # SLIDE 16: Module Description
    {
        "sec": "Section 4: Modules and Implementation",
        "title": "Module Description",
        "left_title": "Authentication & Ingestion Modules",
        "left_bullets": [
            "Authentication Module: Secure JWT session management separating Instructor and Student permissions via Supabase Auth.",
            "Course Management Module: Comprehensive dashboard for creating courses, organizing lectures, and tracking student progress.",
            "PDF Processing Module: High-speed document parser extracting clean text, structure, and chapter hierarchies from uploaded notes."
        ],
        "right_title": "Lecture, TTS, Avatar & Interaction Modules",
        "right_bullets": [
            "AI Lecture Generation Module: Converts curriculum topics into engaging pedagogical lecture scripts with slide triggers.",
            "TTS & Speech Synthesis Module: Kokoro-82M neural engine generating audio buffers and phoneme/viseme timing tables.",
            "3D Avatar Module: Three.js WebGL viewport rendering humanoid teacher meshes with 52 blendshape morph targets.",
            "Student Interaction Module: Real-time voice and text doubt-handling engine with lecture interruption and resumption protocols."
        ],
        "accent": "38BDF8", "sec_color": "7DD3FC"
    },

    # SLIDE 17: PDF Processing and RAG Implementation
    {
        "sec": "Section 4: Modules and Implementation",
        "title": "PDF Processing and RAG Implementation",
        "left_title": "PyMuPDF, Chunking & Gemini Embeddings",
        "left_bullets": [
            "PyMuPDF Parsing: Extracts text blocks from complex multi-column academic PDFs while preserving heading hierarchies.",
            "TikToken Chunking: Tokenizer (cl100k_base) divides documents into 512-token semantic segments with 10% overlap.",
            "Gemini Embeddings: Google text-embedding-004 encodes every text chunk into a 768-dimensional dense vector representation.",
            "pgvector Storage: Chunks and embeddings are indexed in PostgreSQL using IVFFlat cosine similarity for sub-50ms search."
        ],
        "right_title": "Document-Grounded Question Answering",
        "right_bullets": [
            "Question Vectorization: Incoming student queries are embedded into vectors and matched against course chunks.",
            "Context Retrieval: Top-K (K=3) most relevant textbook chunks are retrieved and injected into the Gemini context window.",
            "Document-Grounded Question Answering: Strictly enforces zero hallucinations by requiring Gemini to cite exact textbook paragraphs."
        ],
        "accent": "10B981", "sec_color": "34D399"
    },

    # SLIDE 18: AI Lecture Generation and Speech Synthesis
    {
        "sec": "Section 4: Modules and Implementation",
        "title": "AI Lecture Generation and Speech Synthesis",
        "left_title": "Gemini Script Generation & Pedagogical Persona",
        "left_bullets": [
            "Gemini Script Generation: Gemini 1.5 Pro structures raw syllabus concepts into organized, conversational lecture modules.",
            "Pedagogical Persona: System prompt directs the AI professor to teach using analogies, conceptual checkpoints, and clear summaries.",
            "Slide Synchronization Cues: Automatically generates slide trigger tags (e.g., [SHOW_SLIDE: 3]) embedded directly into the script.",
            "Natural Rhetorical Pacing: Incorporates conversational pauses and emphasis markers to simulate authentic classroom teaching."
        ],
        "right_title": "Kokoro-82M TTS, Phonemes & Viseme Generation",
        "right_bullets": [
            "Kokoro-82M TTS: Lightweight 82M open neural model synthesizing human-like speech at 10x real-time speed.",
            "Phoneme Processing: Extracts individual phonemes (e.g., AA, EE, OH, TH, PP) with precise start and end millisecond timestamps.",
            "Viseme Generation: Translates phonemes into 15 standard visual viseme shapes to drive realistic 3D avatar lip-sync."
        ],
        "accent": "6366F1", "sec_color": "818CF8"
    },

    # SLIDE 19: 3D Avatar Animation and Lip-Sync
    {
        "sec": "Section 4: Modules and Implementation",
        "title": "3D Avatar Animation and Lip-Sync",
        "left_title": "Three.js, React Three Fiber & Morph Targets",
        "left_bullets": [
            "Three.js & React Three Fiber: High-performance WebGL graphics pipeline rendering 3D classroom scenes at 60 FPS.",
            "Facial Morph Targets: 52 standard ARKit blendshape targets (jawOpen, mouthFunnel, mouthPucker) dynamically weighted in real time.",
            "Visemes: Audio timestamps interpolate target viseme weights smoothly using cubic Hermite splines to eliminate jitter."
        ],
        "right_title": "Gestures and Inverse Kinematics",
        "right_bullets": [
            "Gestures: State machine triggers natural pedagogical gestures—pointing to the blackboard, nodding, and hand explanations.",
            "Inverse Kinematics: Real-time IK solver aligns avatar hand and arm positions naturally with virtual blackboard coordinates.",
            "Micro-Animations: Procedural blinking, natural eye saccades, and subtle breathing animations prevent uncanny valley effects."
        ],
        "accent": "38BDF8", "sec_color": "7DD3FC"
    },

    # SLIDE 20: Real-Time Synchronization and Interactive Q&A
    {
        "sec": "Section 4: Modules and Implementation",
        "title": "Real-Time Synchronization and Interactive Q&A",
        "left_title": "Supabase Realtime & Clock Synchronization",
        "left_bullets": [
            "Supabase Realtime: WebSockets event bus broadcasting millisecond-accurate playback timestamps to all connected students.",
            "Clock Synchronization: Client-side clock drift compensation ensures avatar speech, lip-sync, and slide cues remain in lockstep.",
            "Packet Resilience: Interpolation buffer handles temporary network jitter without interrupting avatar movement or audio."
        ],
        "right_title": "Student Questions, Interruption & Resumption",
        "right_bullets": [
            "Student Questions: Students can raise their hand and ask spoken or typed doubts during any point of the lecture.",
            "Lecture Interruption: Client emits an immediate pause event, causing the avatar to stop talking and transition to a listening pose.",
            "Lecture Resumption: Avatar answers the student doubt with textbook citations, announces resumption, and smoothly continues the lecture."
        ],
        "accent": "10B981", "sec_color": "34D399"
    },

    # SLIDE 21: Database Design
    {
        "sec": "Section 5: Database, Results and Conclusion",
        "title": "Database Design",
        "left_title": "ER Diagram & Eight Core Tables (PostgreSQL)",
        "left_bullets": [
            "1. users: UUID primary key, email, role (instructor, student), full_name, profile metadata.",
            "2. courses: Course ID, instructor ID foreign key, title, course code, created timestamp.",
            "3. documents: File storage path, MIME type, parsing status, total page count, uploaded_at.",
            "4. document_chunks: Document foreign key, chunk text, 768-dim vector embedding.",
            "Relationships: One-to-many cascading foreign keys link users -> courses -> documents -> document_chunks."
        ],
        "right_title": "Lectures, Analytics & Supabase RLS",
        "right_bullets": [
            "5. lectures: Lecture ID, course ID, title, duration, status, audio URL.",
            "6. lecture_scripts: Structured script JSON containing topic transitions and slide timings.",
            "7. student_qna: Student ID, lecture ID, student question, RAG response, textbook citations.",
            "8. lecture_analytics: Watch duration, engagement score, student interruption timestamps.",
            "pgvector & Supabase RLS: IVFFlat cosine similarity indexing with strict Row-Level Security isolating multi-tenant courses."
        ],
        "accent": "F59E0B", "sec_color": "FBBF24"
    },

    # SLIDE 22: Application Screenshots and Results
    {
        "sec": "Section 5: Database, Results and Conclusion",
        "title": "Application Screenshots and Results",
        "left_title": "Actual Screenshots: Interfaces & Functional Views",
        "left_bullets": [
            "Login & Dashboard: Clean dual-role authentication interface for instructors and students with real-time course overview.",
            "PDF Upload & Processing: Drag-and-drop syllabus upload interface showing real-time PyMuPDF chunking and vector status.",
            "Lecture Generation View: AI script review panel displaying generated pedagogical lecture chapters and blackboard slides.",
            "3D Avatar & Student Q&A: Interactive WebGL classroom featuring the speaking 3D professor, slide board, and live Q&A drawer."
        ],
        "right_title": "Quantitative Benchmark Results",
        "right_bullets": [
            "Ultra-Low Bandwidth: Measured average data usage of 115 kbps (95.4% bandwidth reduction compared to 2.5 Mbps Zoom video).",
            "Sub-Second RAG Latency: End-to-end vector search and Gemini response generation in under 480ms.",
            "Lip-Sync Precision: Stable 60 FPS Three.js rendering with audio-to-viseme drift kept below 15ms.",
            "Hardware Compatibility: Runs smoothly on standard consumer laptops with integrated graphics without GPU acceleration."
        ],
        "accent": "10B981", "sec_color": "34D399"
    },

    # SLIDE 23: Conclusion and Future Enhancements
    {
        "sec": "Section 5: Database, Results and Conclusion",
        "title": "Conclusion and Future Enhancements",
        "left_title": "Project Achievements & Limitations",
        "left_bullets": [
            "Project Achievements: Successfully developed an autonomous virtual classroom integrating RAG, LLM scripting, TTS, and 3D avatars.",
            "Solved Bandwidth Barrier: Replaced heavy video streams with lightweight WebGL animation, enabling remote learning at 115 kbps.",
            "Document Grounding: Eliminated hallucinations by anchoring all answers strictly to university course textbooks.",
            "Current Limitations: Limited to English language instruction and single-student avatar interactions in the current prototype."
        ],
        "right_title": "Future Improvements and Possible Extensions",
        "right_bullets": [
            "Multilingual Support: Adding real-time voice translation into regional Indian languages (Kannada, Hindi, Tamil) via Kokoro models.",
            "Collaborative Classrooms: Enabling multi-student peer avatars and group study rooms within the same 3D virtual environment.",
            "WebXR & Immersive VR: Porting Three.js scenes to WebXR for Apple Vision Pro and Meta Quest virtual reality headsets.",
            "Automated Quiz Generation: Instant generation of interactive formative quizzes dynamically injected between lecture topics."
        ],
        "accent": "6366F1", "sec_color": "818CF8"
    },

    # SLIDE 24: References and Thank You
    {"custom": "thankyou"}
]

# Generate Slide 1 (Title Slide XML)
def build_title_slide_xml():
    return """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld name="Slide 1">
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>
      
      <!-- Background -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="2" name="Bg"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="0" y="0"/><a:ext cx="12192000" cy="6858000"/></a:xfrm>
          <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
          <a:gradFill>
            <a:gsLst>
              <a:gs pos="0"><a:srgbClr val="0F172A"/></a:gs>
              <a:gs pos="60000"><a:srgbClr val="0A0F1D"/></a:gs>
              <a:gs pos="100000"><a:srgbClr val="04060E"/></a:gs>
            </a:gsLst>
            <a:lin ang="5400000"/>
          </a:gradFill>
        </p:spPr>
      </p:sp>

      <!-- College Logo -->
      <p:pic>
        <p:nvPicPr><p:cNvPr id="3" name="CollegeLogo"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>
        <p:blipFill><a:blip r:embed="rId2"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>
        <p:spPr><a:xfrm><a:off x="1000000" y="380000"/><a:ext cx="1000000" cy="1000000"/></a:xfrm><a:prstGeom prst="ellipse"><a:avLst/></a:prstGeom></p:spPr>
      </p:pic>

      <!-- College Header -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="4" name="CollegeHeader"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr><a:xfrm><a:off x="2200000" y="380000"/><a:ext cx="8800000" cy="1000000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln/></p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="0" tIns="0" rIns="0" bIns="0" anchor="ctr"/>
          <a:lstStyle/>
          <a:p>
            <a:r><a:rPr lang="en-US" sz="1300" b="1"><a:solidFill><a:srgbClr val="94A3B8"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>S.J.M  VIDYAPEETHA ®</a:t></a:r>
          </a:p>
          <a:p>
            <a:r><a:rPr lang="en-US" sz="1900" b="1"><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>S.J.M INSTITUTE OF TECHNOLOGY, CHITRADURGA</a:t></a:r>
          </a:p>
          <a:p>
            <a:r><a:rPr lang="en-US" sz="1300" b="1"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>DEPARTMENT OF COMPUTER SCIENCE &amp; ENGINEERING</a:t></a:r>
          </a:p>
        </p:txBody>
      </p:sp>

      <!-- Project Title Banner -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="5" name="TitleBanner"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="1000000" y="1600000"/><a:ext cx="10192000" cy="1400000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 2500"/></a:avLst></a:prstGeom>
          <a:solidFill><a:srgbClr val="131D31"/></a:solidFill>
          <a:ln w="25400"><a:solidFill><a:srgbClr val="6366F1"/></a:solidFill></a:ln>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="200000" tIns="150000" rIns="200000" bIns="150000" anchor="ctr"/>
          <a:lstStyle/>
          <a:p algn="ctr">
            <a:r><a:rPr lang="en-US" sz="1150" b="1"><a:solidFill><a:srgbClr val="818CF8"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>PROJECT PHASE-I &amp; MAJOR PROJECT PHASE-Ⅱ (CODE: BCS685 / BCS786)</a:t></a:r>
          </a:p>
          <a:p algn="ctr">
            <a:r><a:rPr lang="en-US" sz="2800" b="1"><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>INTELLICLASS AI</a:t></a:r>
          </a:p>
          <a:p algn="ctr">
            <a:r><a:rPr lang="en-US" sz="1350"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Autonomous Virtual Classroom with 3D Avatar Lip-Sync &amp; Document RAG</a:t></a:r>
          </a:p>
        </p:txBody>
      </p:sp>

      <!-- Presented By Container (Left) -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="6" name="StudentsBox"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="1000000" y="3250000"/><a:ext cx="4900000" cy="3150000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 2500"/></a:avLst></a:prstGeom>
          <a:solidFill><a:srgbClr val="0E1626"/></a:solidFill>
          <a:ln w="19050"><a:solidFill><a:srgbClr val="334155"/></a:solidFill></a:ln>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="200000" tIns="200000" rIns="200000" bIns="200000" anchor="t"/>
          <a:lstStyle/>
          <a:p>
            <a:r><a:rPr lang="en-US" sz="1350" b="1"><a:solidFill><a:srgbClr val="6366F1"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>PRESENTED BY (STUDENTS):</a:t></a:r>
          </a:p>
        </p:txBody>
      </p:sp>

      <!-- Student Names Column -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="8" name="StudentNames"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="1250000" y="3850000"/><a:ext cx="2400000" cy="2300000"/></a:xfrm>
          <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
          <a:noFill/><a:ln/>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="0" tIns="0" rIns="0" bIns="0" anchor="t"/>
          <a:lstStyle/>
          <a:p><a:r><a:rPr lang="en-US" sz="1300" b="1"><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>SAHANA G S</a:t></a:r></a:p>
          <a:p><a:endParaRPr sz="300"/></a:p>
          <a:p><a:r><a:rPr lang="en-US" sz="1300" b="1"><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>HEMA S</a:t></a:r></a:p>
          <a:p><a:endParaRPr sz="300"/></a:p>
          <a:p><a:r><a:rPr lang="en-US" sz="1300" b="1"><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>RAKSHITHA M H</a:t></a:r></a:p>
          <a:p><a:endParaRPr sz="300"/></a:p>
          <a:p><a:r><a:rPr lang="en-US" sz="1300" b="1"><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>ASHWINI B C</a:t></a:r></a:p>
        </p:txBody>
      </p:sp>

      <!-- Student USN Column -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="9" name="StudentUSNs"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="3750000" y="3850000"/><a:ext cx="2000000" cy="2300000"/></a:xfrm>
          <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
          <a:noFill/><a:ln/>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="0" tIns="0" rIns="0" bIns="0" anchor="t"/>
          <a:lstStyle/>
          <a:p algn="r"><a:r><a:rPr lang="en-US" sz="1250"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill><a:latin typeface="Consolas"/></a:rPr><a:t>4SM34CS083</a:t></a:r></a:p>
          <a:p algn="r"><a:endParaRPr sz="300"/></a:p>
          <a:p algn="r"><a:r><a:rPr lang="en-US" sz="1250"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill><a:latin typeface="Consolas"/></a:rPr><a:t>4SM23CS037</a:t></a:r></a:p>
          <a:p algn="r"><a:endParaRPr sz="300"/></a:p>
          <a:p algn="r"><a:r><a:rPr lang="en-US" sz="1250"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill><a:latin typeface="Consolas"/></a:rPr><a:t>4SM23CS079</a:t></a:r></a:p>
          <a:p algn="r"><a:endParaRPr sz="300"/></a:p>
          <a:p algn="r"><a:r><a:rPr lang="en-US" sz="1250"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill><a:latin typeface="Consolas"/></a:rPr><a:t>4SM24CS400</a:t></a:r></a:p>
        </p:txBody>
      </p:sp>

      <!-- Faculty Supervision Box (Right) -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="7" name="FacultyBox"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="6292000" y="3250000"/><a:ext cx="4900000" cy="3150000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 2500"/></a:avLst></a:prstGeom>
          <a:solidFill><a:srgbClr val="0E1626"/></a:solidFill>
          <a:ln w="19050"><a:solidFill><a:srgbClr val="334155"/></a:solidFill></a:ln>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="200000" tIns="200000" rIns="200000" bIns="200000" anchor="t"/>
          <a:lstStyle/>
          <a:p>
            <a:r><a:rPr lang="en-US" sz="1100" b="1"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>PROJECT GUIDE:</a:t></a:r>
          </a:p>
          <a:p>
            <a:r><a:rPr lang="en-US" sz="1400" b="1"><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>Prof. Sagar K R, M.Tech.</a:t></a:r>
          </a:p>
          <a:p>
            <a:r><a:rPr lang="en-US" sz="1150"><a:solidFill><a:srgbClr val="94A3B8"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Assistant Professor, Dept. of CS&amp;E, S.J.M.I.T</a:t></a:r>
          </a:p>
          <a:p><a:endParaRPr sz="500"/></a:p>
          <a:p>
            <a:r><a:rPr lang="en-US" sz="1100" b="1"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>HEAD OF THE DEPARTMENT:</a:t></a:r>
          </a:p>
          <a:p>
            <a:r><a:rPr lang="en-US" sz="1400" b="1"><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>Dr. Krishnareddy K R, M.Tech., Ph.D.</a:t></a:r>
          </a:p>
          <a:p>
            <a:r><a:rPr lang="en-US" sz="1150"><a:solidFill><a:srgbClr val="94A3B8"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Professor &amp; HOD, Dept. of CS&amp;E, S.J.M.I.T</a:t></a:r>
          </a:p>
        </p:txBody>
      </p:sp>

    </p:spTree>
  </p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sld>"""

def build_thankyou_slide_xml():
    return """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld name="Slide 24">
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>
      
      <!-- Modern Slate Gradient Background -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="2" name="SlideBg"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="0" y="0"/><a:ext cx="12192000" cy="6858000"/></a:xfrm>
          <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
          <a:gradFill>
            <a:gsLst>
              <a:gs pos="0"><a:srgbClr val="0F172A"/></a:gs>
              <a:gs pos="60000"><a:srgbClr val="090D1A"/></a:gs>
              <a:gs pos="100000"><a:srgbClr val="040711"/></a:gs>
            </a:gsLst>
            <a:lin ang="5400000"/>
          </a:gradFill>
        </p:spPr>
      </p:sp>

      <!-- Top Section Pill -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="3" name="SectionPill"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="685800" y="380000"/><a:ext cx="4900000" cy="320000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 50000"/></a:avLst></a:prstGeom>
          <a:solidFill><a:srgbClr val="1E293B"/></a:solidFill>
          <a:ln w="12700"><a:solidFill><a:srgbClr val="818CF8"/></a:solidFill></a:ln>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="100000" tIns="0" rIns="100000" bIns="0" anchor="ctr"/>
          <a:lstStyle/>
          <a:p>
            <a:r>
              <a:rPr lang="en-US" sz="1100" b="1"><a:solidFill><a:srgbClr val="818CF8"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr>
              <a:t>SECTION 5: DATABASE, RESULTS AND CONCLUSION</a:t>
            </a:r>
          </a:p>
        </p:txBody>
      </p:sp>

      <!-- Slide Title & Number -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="4" name="SlideTitle"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr><a:xfrm><a:off x="685800" y="780000"/><a:ext cx="10820400" cy="620000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln/></p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="0" tIns="0" rIns="0" bIns="0" anchor="ctr"/>
          <a:lstStyle/>
          <a:p>
            <a:r>
              <a:rPr lang="en-US" sz="2600" b="1"><a:solidFill><a:srgbClr val="6366F1"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr>
              <a:t>24. </a:t>
            </a:r>
            <a:r>
              <a:rPr lang="en-US" sz="2600" b="1"><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr>
              <a:t>References and Thank You</a:t>
            </a:r>
          </a:p>
        </p:txBody>
      </p:sp>

      <!-- Left Content Card (Research Papers & Documentation) -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="5" name="LeftCard"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="685800" y="1550000"/><a:ext cx="5350000" cy="4850000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 2800"/></a:avLst></a:prstGeom>
          <a:solidFill><a:srgbClr val="131D31"/></a:solidFill>
          <a:ln w="19050"><a:solidFill><a:srgbClr val="6366F1"/></a:solidFill></a:ln>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="250000" tIns="240000" rIns="250000" bIns="240000" anchor="t"/>
          <a:lstStyle/>
          <a:p>
            <a:r>
              <a:rPr lang="en-US" sz="1650" b="1"><a:solidFill><a:srgbClr val="6366F1"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr>
              <a:t>Research Papers &amp; Documentation</a:t>
            </a:r>
          </a:p>
          <a:p><a:endParaRPr sz="600"/></a:p>
          <a:p>
            <a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr>
            <a:r><a:rPr lang="en-US" sz="1250" b="1"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>[1] Vaswani, A., et al. (2017): </a:t></a:r>
            <a:r><a:rPr lang="en-US" sz="1250"><a:solidFill><a:srgbClr val="E2E8F0"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>"Attention Is All You Need", Advances in Neural Information Processing Systems (NeurIPS).</a:t></a:r>
          </a:p>
          <a:p><a:endParaRPr sz="400"/></a:p>
          <a:p>
            <a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr>
            <a:r><a:rPr lang="en-US" sz="1250" b="1"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>[2] Lewis, P., et al. (2020): </a:t></a:r>
            <a:r><a:rPr lang="en-US" sz="1250"><a:solidFill><a:srgbClr val="E2E8F0"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>"Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks", NeurIPS 2020.</a:t></a:r>
          </a:p>
          <a:p><a:endParaRPr sz="400"/></a:p>
          <a:p>
            <a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr>
            <a:r><a:rPr lang="en-US" sz="1250" b="1"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>[3] Kokoro-82M TTS Architecture: </a:t></a:r>
            <a:r><a:rPr lang="en-US" sz="1250"><a:solidFill><a:srgbClr val="E2E8F0"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Lightweight neural text-to-speech engine and phoneme timestamp extraction specifications (2024).</a:t></a:r>
          </a:p>
          <a:p><a:endParaRPr sz="400"/></a:p>
          <a:p>
            <a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr>
            <a:r><a:rPr lang="en-US" sz="1250" b="1"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>[4] Three.js &amp; WebGL 2.0 Spec: </a:t></a:r>
            <a:r><a:rPr lang="en-US" sz="1250"><a:solidFill><a:srgbClr val="E2E8F0"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Hardware-accelerated 3D graphics rendering and ARKit 52 morph target blendshape standards.</a:t></a:r>
          </a:p>
          <a:p><a:endParaRPr sz="400"/></a:p>
          <a:p>
            <a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr>
            <a:r><a:rPr lang="en-US" sz="1250" b="1"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>[5] Supabase pgvector Manual: </a:t></a:r>
            <a:r><a:rPr lang="en-US" sz="1250"><a:solidFill><a:srgbClr val="E2E8F0"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>High-dimensional vector indexing using IVFFlat cosine similarity in PostgreSQL 15.</a:t></a:r>
          </a:p>
        </p:txBody>
      </p:sp>

      <!-- Right Content Card (Technologies Used & Thank You Banner) -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="6" name="RightCard"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="6156200" y="1550000"/><a:ext cx="5350000" cy="4850000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 2800"/></a:avLst></a:prstGeom>
          <a:solidFill><a:srgbClr val="131D31"/></a:solidFill>
          <a:ln w="19050"><a:solidFill><a:srgbClr val="334155"/></a:solidFill></a:ln>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="250000" tIns="240000" rIns="250000" bIns="240000" anchor="t"/>
          <a:lstStyle/>
          <a:p>
            <a:r>
              <a:rPr lang="en-US" sz="1650" b="1"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr>
              <a:t>Technologies Used &amp; Discussion</a:t>
            </a:r>
          </a:p>
          <a:p><a:endParaRPr sz="600"/></a:p>
          <a:p>
            <a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr>
            <a:r><a:rPr lang="en-US" sz="1250" b="1"><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Full Stack: </a:t></a:r>
            <a:r><a:rPr lang="en-US" sz="1250"><a:solidFill><a:srgbClr val="E2E8F0"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Next.js 15, React 19, FastAPI, Google Gemini 1.5, Kokoro-82M TTS, Supabase pgvector, Three.js.</a:t></a:r>
          </a:p>
          <a:p><a:endParaRPr sz="400"/></a:p>
          <a:p>
            <a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr>
            <a:r><a:rPr lang="en-US" sz="1250" b="1"><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Department: </a:t></a:r>
            <a:r><a:rPr lang="en-US" sz="1250"><a:solidFill><a:srgbClr val="E2E8F0"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Dept. of Computer Science &amp; Engineering, S.J.M.I.T, Chitradurga.</a:t></a:r>
          </a:p>
          <a:p><a:endParaRPr sz="400"/></a:p>
          <a:p>
            <a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr>
            <a:r><a:rPr lang="en-US" sz="1250" b="1"><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Supervision: </a:t></a:r>
            <a:r><a:rPr lang="en-US" sz="1250"><a:solidFill><a:srgbClr val="E2E8F0"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Prof. Sagar K R, M.Tech. (Guide) &amp; Dr. Krishnareddy K R (HOD).</a:t></a:r>
          </a:p>
          <a:p><a:endParaRPr sz="800"/></a:p>

          <!-- Embedded Thank You & Q&A Box -->
          <a:p algn="ctr">
            <a:r><a:rPr lang="en-US" sz="2800" b="1"><a:solidFill><a:srgbClr val="10B981"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>Thank You!</a:t></a:r>
          </a:p>
          <a:p algn="ctr"><a:endParaRPr sz="300"/></a:p>
          <a:p algn="ctr">
            <a:r><a:rPr lang="en-US" sz="1450" b="1"><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>Open for Questions &amp; Discussion</a:t></a:r>
          </a:p>
          <a:p algn="ctr">
            <a:r><a:rPr lang="en-US" sz="1200"><a:solidFill><a:srgbClr val="94A3B8"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Evaluation Committee &amp; Faculty Review</a:t></a:r>
          </a:p>
        </p:txBody>
      </p:sp>

    </p:spTree>
  </p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sld>"""

# Generate all 24 slides XML
slides_dir = os.path.join(build_dir, 'ppt/slides')
rels_dir = os.path.join(slides_dir, '_rels')

for i, slide in enumerate(intelliclass_slides, start=1):
    slide_xml_path = os.path.join(slides_dir, f'slide{i}.xml')
    rels_xml_path = os.path.join(rels_dir, f'slide{i}.xml.rels')

    if slide.get('custom') == 'title':
        s_xml = build_title_slide_xml()
        r_xml = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/college_logo.jpg"/>
</Relationships>"""
    elif slide.get('custom') == 'thankyou':
        s_xml = build_thankyou_slide_xml()
        r_xml = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/college_logo.jpg"/>
</Relationships>"""
    else:
        s_xml, r_xml = build_slide_xml(
            slide_num=i,
            section_name=slide['sec'],
            slide_title=slide['title'],
            left_box_title=slide['left_title'],
            left_bullets=slide['left_bullets'],
            right_box_title=slide['right_title'],
            right_bullets=slide['right_bullets'],
            accent_color=slide.get('accent', '6366F1'),
            sec_color=slide.get('sec_color', '38BDF8')
        )

    with open(slide_xml_path, 'w', encoding='utf-8') as f:
        f.write(s_xml)
    with open(rels_xml_path, 'w', encoding='utf-8') as f:
        f.write(r_xml)

print("[+] All 24 slide XMLs generated successfully")

# Create presentation.xml and presentation.xml.rels
pres_xml = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" saveSubsetFonts="1">
  <p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst>
  <p:sldIdLst>
"""
for i in range(1, 25):
    pres_xml += f'    <p:sldId id="{300+i}" r:id="rId_slide_{i}"/>\n'

pres_xml += """  </p:sldIdLst>
  <p:sldSz cx="12192000" cy="6858000"/>
  <p:notesSz cx="6858000" cy="12192000"/>
</p:presentation>"""

with open(os.path.join(build_dir, 'ppt/presentation.xml'), 'w', encoding='utf-8') as f:
    f.write(pres_xml)

pres_rels_xml = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>
"""
for i in range(1, 25):
    pres_rels_xml += f'  <Relationship Id="rId_slide_{i}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide{i}.xml"/>\n'
pres_rels_xml += "</Relationships>"

with open(os.path.join(build_dir, 'ppt/_rels/presentation.xml.rels'), 'w', encoding='utf-8') as f:
    f.write(pres_rels_xml)

print("[+] presentation.xml and rels generated")

# Pack into Final PPTX file
output_pptx = '/Users/bsudh/climora/climora-dashboard/IntelliClass_AI_Final_Presentation_24_Slides.pptx'
with zipfile.ZipFile(output_pptx, 'w', zipfile.ZIP_DEFLATED) as z:
    for root, dirs, files in os.walk(build_dir):
        for file in files:
            full = os.path.join(root, file)
            rel = os.path.relpath(full, build_dir)
            z.write(full, rel)

# Also copy to Climora_Final_Presentation_24_Slides.pptx so both links work
shutil.copyfile(output_pptx, '/Users/bsudh/climora/climora-dashboard/Climora_Final_Presentation_24_Slides.pptx')
shutil.copyfile(output_pptx, '/Users/bsudh/climora/climora-dashboard/Climora_Final_Presentation.pptx')

print(f"[SUCCESS] Final 24-Slide Presentation built at:")
print(f" -> {output_pptx}")
size_mb = os.path.getsize(output_pptx) / (1024 * 1024)
print(f"File size: {size_mb:.2f} MB")
