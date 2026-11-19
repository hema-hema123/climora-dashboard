import os
import shutil
import zipfile
import re
import xml.etree.ElementTree as ET

orig_pptx = '/Users/bsudh/.gemini/antigravity/brain/3a6b2e5d-a1ef-4d39-b669-aef36d03be8f/.user_uploaded/media_1795000131185_98ed92a9.pptx'
user_dir = '/Users/bsudh/.gemini/antigravity/brain/3a6b2e5d-a1ef-4d39-b669-aef36d03be8f/.user_uploaded'
build_dir = '/Users/bsudh/climora/climora-dashboard/climora_24_build'

if os.path.exists(build_dir):
    shutil.rmtree(build_dir)
os.makedirs(build_dir, exist_ok=True)

# 1. Unpack original presentation to preserve exact theme, master, and original slide 1
with zipfile.ZipFile(orig_pptx, 'r') as z:
    z.extractall(build_dir)

print(f"[+] Original PPTX extracted successfully")

# 2. Stage the 6 uploaded snapshots into ppt/media
media_dir = os.path.join(build_dir, 'ppt/media')
shutil.copyfile(os.path.join(user_dir, 'media_1795014440129_d1e64841.jpg'), os.path.join(media_dir, 'snap_arch_diagram.jpg'))
shutil.copyfile(os.path.join(user_dir, 'media_1795014285661_641bddb3.jpg'), os.path.join(media_dir, 'snap_full_dashboard.jpg'))
shutil.copyfile(os.path.join(user_dir, 'media_1795014274148_b618bbab.png'), os.path.join(media_dir, 'snap_3d_mapbox.png'))
shutil.copyfile(os.path.join(user_dir, 'media_1795014266229_644f967d.png'), os.path.join(media_dir, 'snap_top_heatzones.png'))
shutil.copyfile(os.path.join(user_dir, 'media_1795014300209_4987891a.png'), os.path.join(media_dir, 'snap_green_infra.png'))
shutil.copyfile(os.path.join(user_dir, 'media_1795014322599_a1d67871.png'), os.path.join(media_dir, 'snap_projected_cooling.png'))

print(f"[+] Staged all 6 user snapshots into ppt/media")

def xml_esc(text):
    text = str(text).replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')
    return text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

# Helper for SINGLE WIDE POINT-WISE SLIDE (NO TWO BOXES)
def build_pointwise_wide_slide(slide_num, sec_title, slide_title, bullets, accent="10B981", sec_color="38BDF8"):
    ps = ""
    for b in bullets:
        # Check if bullet has bold prefix like "• **Prefix**: Rest" or "• Prefix: Rest"
        parts = b.split(':', 1)
        if len(parts) == 2 and not b.startswith('  •'):
            prefix, rest = parts[0].strip(), parts[1].strip()
            ps += f"""<a:p>
              <a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr>
              <a:r>
                <a:rPr lang="en-US" sz="1350" b="1"><a:solidFill><a:srgbClr val="F8FAFC"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr>
                <a:t>{xml_esc(prefix)}: </a:t>
              </a:r>
              <a:r>
                <a:rPr lang="en-US" sz="1350"><a:solidFill><a:srgbClr val="CBD5E1"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr>
                <a:t>{xml_esc(rest)}</a:t>
              </a:r>
            </a:p>
            <a:p><a:endParaRPr sz="400"/></a:p>"""
        else:
            ps += f"""<a:p>
              <a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr>
              <a:r>
                <a:rPr lang="en-US" sz="1350"><a:solidFill><a:srgbClr val="CBD5E1"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr>
                <a:t>{xml_esc(b)}</a:t>
              </a:r>
            </a:p>
            <a:p><a:endParaRPr sz="400"/></a:p>"""

    xml = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld name="Slide {slide_num}">
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>
      
      <!-- Canvas Background (image5.png) -->
      <p:pic>
        <p:nvPicPr><p:cNvPr id="2" name="SlideBg"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>
        <p:blipFill><a:blip r:embed="rId_bg"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>
        <p:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="12192000" cy="6858000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr>
      </p:pic>

      <!-- Footer Brand Logo (image8.png) -->
      <p:pic>
        <p:nvPicPr><p:cNvPr id="3" name="FooterLogo"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>
        <p:blipFill><a:blip r:embed="rId_footer"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>
        <p:spPr><a:xfrm><a:off x="11496675" y="6162675"/><a:ext cx="323850" cy="323850"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr>
      </p:pic>

      <!-- Top Section Category Pill -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="4" name="SecPill"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="800000" y="380000"/><a:ext cx="4600000" cy="320000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 50000"/></a:avLst></a:prstGeom>
          <a:solidFill><a:srgbClr val="072230"/></a:solidFill>
          <a:ln w="12700"><a:solidFill><a:srgbClr val="{sec_color}"/></a:solidFill></a:ln>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="100000" tIns="0" rIns="100000" bIns="0" anchor="ctr"/>
          <a:lstStyle/>
          <a:p>
            <a:r>
              <a:rPr lang="en-US" sz="1100" b="1"><a:solidFill><a:srgbClr val="{sec_color}"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr>
              <a:t>{xml_esc(sec_title.upper())}</a:t>
            </a:r>
          </a:p>
        </p:txBody>
      </p:sp>

      <!-- Slide Title & Number -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="5" name="Title"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr><a:xfrm><a:off x="800000" y="780000"/><a:ext cx="10592000" cy="620000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln/></p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="0" tIns="0" rIns="0" bIns="0" anchor="ctr"/>
          <a:lstStyle/>
          <a:p>
            <a:r>
              <a:rPr lang="en-US" sz="2600" b="1"><a:solidFill><a:srgbClr val="{accent}"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr>
              <a:t>{slide_num:02d}. </a:t>
            </a:r>
            <a:r>
              <a:rPr lang="en-US" sz="2600" b="1"><a:solidFill><a:srgbClr val="F8FAFC"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr>
              <a:t>{xml_esc(slide_title)}</a:t>
            </a:r>
          </a:p>
        </p:txBody>
      </p:sp>

      <!-- Wide Point-Wise Content Card -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="6" name="WideContentCard"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="800000" y="1520000"/><a:ext cx="10592000" cy="4900000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 2400"/></a:avLst></a:prstGeom>
          <a:solidFill><a:srgbClr val="071A28"/></a:solidFill>
          <a:ln w="19050"><a:solidFill><a:srgbClr val="1E293B"/></a:solidFill></a:ln>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="300000" tIns="300000" rIns="300000" bIns="300000" anchor="t"/>
          <a:lstStyle/>
          {ps}
        </p:txBody>
      </p:sp>

    </p:spTree>
  </p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sld>"""

    rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
  <Relationship Id="rId_bg" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/image5.png"/>
  <Relationship Id="rId_footer" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/image8.png"/>
</Relationships>"""
    return xml, rels


# Helper for SIDE-BY-SIDE POINT-WISE + SNAPSHOT SLIDE
def build_pointwise_with_image_slide(slide_num, sec_title, slide_title, bullets, image_target, image_width=5000000, image_height=4850000, accent="10B981", sec_color="38BDF8"):
    ps = ""
    for b in bullets:
        parts = b.split(':', 1)
        if len(parts) == 2 and not b.startswith('  •'):
            prefix, rest = parts[0].strip(), parts[1].strip()
            ps += f"""<a:p>
              <a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr>
              <a:r>
                <a:rPr lang="en-US" sz="1300" b="1"><a:solidFill><a:srgbClr val="F8FAFC"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr>
                <a:t>{xml_esc(prefix)}: </a:t>
              </a:r>
              <a:r>
                <a:rPr lang="en-US" sz="1300"><a:solidFill><a:srgbClr val="CBD5E1"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr>
                <a:t>{xml_esc(rest)}</a:t>
              </a:r>
            </a:p>
            <a:p><a:endParaRPr sz="350"/></a:p>"""
        else:
            ps += f"""<a:p>
              <a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr>
              <a:r>
                <a:rPr lang="en-US" sz="1300"><a:solidFill><a:srgbClr val="CBD5E1"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr>
                <a:t>{xml_esc(b)}</a:t>
              </a:r>
            </a:p>
            <a:p><a:endParaRPr sz="350"/></a:p>"""

    text_card_width = 10592000 - image_width - 300000
    img_x = 800000 + text_card_width + 300000

    xml = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld name="Slide {slide_num}">
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>
      
      <!-- Canvas Background -->
      <p:pic>
        <p:nvPicPr><p:cNvPr id="2" name="SlideBg"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>
        <p:blipFill><a:blip r:embed="rId_bg"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>
        <p:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="12192000" cy="6858000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr>
      </p:pic>

      <!-- Footer Brand Logo -->
      <p:pic>
        <p:nvPicPr><p:cNvPr id="3" name="FooterLogo"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>
        <p:blipFill><a:blip r:embed="rId_footer"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>
        <p:spPr><a:xfrm><a:off x="11496675" y="6162675"/><a:ext cx="323850" cy="323850"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr>
      </p:pic>

      <!-- Top Section Category Pill -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="4" name="SecPill"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="800000" y="380000"/><a:ext cx="4600000" cy="320000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 50000"/></a:avLst></a:prstGeom>
          <a:solidFill><a:srgbClr val="072230"/></a:solidFill>
          <a:ln w="12700"><a:solidFill><a:srgbClr val="{sec_color}"/></a:solidFill></a:ln>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="100000" tIns="0" rIns="100000" bIns="0" anchor="ctr"/>
          <a:lstStyle/>
          <a:p>
            <a:r>
              <a:rPr lang="en-US" sz="1100" b="1"><a:solidFill><a:srgbClr val="{sec_color}"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr>
              <a:t>{xml_esc(sec_title.upper())}</a:t>
            </a:r>
          </a:p>
        </p:txBody>
      </p:sp>

      <!-- Slide Title & Number -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="5" name="Title"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr><a:xfrm><a:off x="800000" y="780000"/><a:ext cx="10592000" cy="620000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln/></p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="0" tIns="0" rIns="0" bIns="0" anchor="ctr"/>
          <a:lstStyle/>
          <a:p>
            <a:r>
              <a:rPr lang="en-US" sz="2600" b="1"><a:solidFill><a:srgbClr val="{accent}"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr>
              <a:t>{slide_num:02d}. </a:t>
            </a:r>
            <a:r>
              <a:rPr lang="en-US" sz="2600" b="1"><a:solidFill><a:srgbClr val="F8FAFC"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr>
              <a:t>{xml_esc(slide_title)}</a:t>
            </a:r>
          </a:p>
        </p:txBody>
      </p:sp>

      <!-- Left Point-Wise Card -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="6" name="TextCard"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="800000" y="1520000"/><a:ext cx="{text_card_width}" cy="4900000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 2400"/></a:avLst></a:prstGeom>
          <a:solidFill><a:srgbClr val="071A28"/></a:solidFill>
          <a:ln w="19050"><a:solidFill><a:srgbClr val="1E293B"/></a:solidFill></a:ln>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="250000" tIns="250000" rIns="250000" bIns="250000" anchor="t"/>
          <a:lstStyle/>
          {ps}
        </p:txBody>
      </p:sp>

      <!-- Right Embedded Snapshot -->
      <p:pic>
        <p:nvPicPr><p:cNvPr id="7" name="SnapshotImg"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>
        <p:blipFill><a:blip r:embed="rId_snap"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>
        <p:spPr>
          <a:xfrm><a:off x="{img_x}" y="1520000"/><a:ext cx="{image_width}" cy="{image_height}"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 2000"/></a:avLst></a:prstGeom>
          <a:ln w="25400"><a:solidFill><a:srgbClr val="{accent}"/></a:solidFill></a:ln>
        </p:spPr>
      </p:pic>

    </p:spTree>
  </p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sld>"""

    rels = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
  <Relationship Id="rId_bg" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/image5.png"/>
  <Relationship Id="rId_footer" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/image8.png"/>
  <Relationship Id="rId_snap" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/{image_target}"/>
</Relationships>"""
    return xml, rels


# Custom layout for Slide 13 (Full-Width Official Architecture Diagram)
def build_slide13_arch_xml():
    xml = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld name="Slide 13">
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>
      
      <!-- Canvas Background -->
      <p:pic>
        <p:nvPicPr><p:cNvPr id="2" name="SlideBg"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>
        <p:blipFill><a:blip r:embed="rId_bg"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>
        <p:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="12192000" cy="6858000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr>
      </p:pic>

      <!-- Footer Brand Logo -->
      <p:pic>
        <p:nvPicPr><p:cNvPr id="3" name="FooterLogo"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>
        <p:blipFill><a:blip r:embed="rId_footer"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>
        <p:spPr><a:xfrm><a:off x="11496675" y="6162675"/><a:ext cx="323850" cy="323850"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr>
      </p:pic>

      <!-- Top Section Pill -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="4" name="SecPill"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="800000" y="380000"/><a:ext cx="4600000" cy="320000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 50000"/></a:avLst></a:prstGeom>
          <a:solidFill><a:srgbClr val="072230"/></a:solidFill>
          <a:ln w="12700"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill></a:ln>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="100000" tIns="0" rIns="100000" bIns="0" anchor="ctr"/>
          <a:lstStyle/>
          <a:p><a:r><a:rPr lang="en-US" sz="1100" b="1"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>SECTION 3: REQUIREMENTS AND SYSTEM DESIGN</a:t></a:r></a:p>
        </p:txBody>
      </p:sp>

      <!-- Slide Title -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="5" name="Title"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr><a:xfrm><a:off x="800000" y="780000"/><a:ext cx="10592000" cy="620000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln/></p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="0" tIns="0" rIns="0" bIns="0" anchor="ctr"/>
          <a:lstStyle/>
          <a:p>
            <a:r><a:rPr lang="en-US" sz="2600" b="1"><a:solidFill><a:srgbClr val="10B981"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>13. </a:t></a:r>
            <a:r><a:rPr lang="en-US" sz="2600" b="1"><a:solidFill><a:srgbClr val="F8FAFC"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>System Architecture</a:t></a:r>
          </a:p>
        </p:txBody>
      </p:sp>

      <!-- Full-Width Architecture Diagram Image (snap_arch_diagram.jpg) -->
      <p:pic>
        <p:nvPicPr><p:cNvPr id="6" name="ArchitectureDiagram"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>
        <p:blipFill><a:blip r:embed="rId_arch"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>
        <p:spPr>
          <a:xfrm><a:off x="1496000" y="1520000"/><a:ext cx="9200000" cy="4200000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 1500"/></a:avLst></a:prstGeom>
          <a:ln w="25400"><a:solidFill><a:srgbClr val="10B981"/></a:solidFill></a:ln>
        </p:spPr>
      </p:pic>

      <!-- Architecture Point-Wise Summary Strip Below -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="7" name="ArchSummary"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="800000" y="5850000"/><a:ext cx="10592000" cy="650000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 20000"/></a:avLst></a:prstGeom>
          <a:solidFill><a:srgbClr val="071A28"/></a:solidFill>
          <a:ln w="12700"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill></a:ln>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="200000" tIns="100000" rIns="200000" bIns="100000" anchor="ctr"/>
          <a:lstStyle/>
          <a:p>
            <a:r><a:rPr lang="en-US" sz="1200" b="1"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>Key Architectural Highlights: </a:t></a:r>
            <a:r><a:rPr lang="en-US" sz="1200"><a:solidFill><a:srgbClr val="CBD5E1"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>5-Tier Client-Side Architecture (Next.js 16 + React 19) • Local State via Zustand &amp; TanStack Query • Climate Engine executing UHI Differential &amp; Hotspot Models in-browser • Direct telemetry from NASA POWER &amp; NOAA APIs • Zero server hosting costs.</a:t></a:r>
          </a:p>
        </p:txBody>
      </p:sp>

    </p:spTree>
  </p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sld>"""

    rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
  <Relationship Id="rId_bg" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/image5.png"/>
  <Relationship Id="rId_footer" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/image8.png"/>
  <Relationship Id="rId_arch" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/snap_arch_diagram.jpg"/>
</Relationships>"""
    return xml, rels


# Custom layout for Slide 22 (Application Screenshots and Results Gallery)
def build_slide22_gallery_xml():
    xml = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld name="Slide 22">
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>
      
      <!-- Canvas Background -->
      <p:pic>
        <p:nvPicPr><p:cNvPr id="2" name="SlideBg"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>
        <p:blipFill><a:blip r:embed="rId_bg"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>
        <p:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="12192000" cy="6858000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr>
      </p:pic>

      <!-- Footer Brand Logo -->
      <p:pic>
        <p:nvPicPr><p:cNvPr id="3" name="FooterLogo"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>
        <p:blipFill><a:blip r:embed="rId_footer"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>
        <p:spPr><a:xfrm><a:off x="11496675" y="6162675"/><a:ext cx="323850" cy="323850"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr>
      </p:pic>

      <!-- Top Section Pill -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="4" name="SecPill"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="800000" y="380000"/><a:ext cx="4900000" cy="320000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 50000"/></a:avLst></a:prstGeom>
          <a:solidFill><a:srgbClr val="072230"/></a:solidFill>
          <a:ln w="12700"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill></a:ln>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="100000" tIns="0" rIns="100000" bIns="0" anchor="ctr"/>
          <a:lstStyle/>
          <a:p><a:r><a:rPr lang="en-US" sz="1100" b="1"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>SECTION 5: DATABASE, RESULTS AND CONCLUSION</a:t></a:r></a:p>
        </p:txBody>
      </p:sp>

      <!-- Slide Title -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="5" name="Title"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr><a:xfrm><a:off x="800000" y="780000"/><a:ext cx="10592000" cy="620000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln/></p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="0" tIns="0" rIns="0" bIns="0" anchor="ctr"/>
          <a:lstStyle/>
          <a:p>
            <a:r><a:rPr lang="en-US" sz="2600" b="1"><a:solidFill><a:srgbClr val="10B981"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>22. </a:t></a:r>
            <a:r><a:rPr lang="en-US" sz="2600" b="1"><a:solidFill><a:srgbClr val="F8FAFC"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>Application Screenshots and Results</a:t></a:r>
          </a:p>
        </p:txBody>
      </p:sp>

      <!-- Top Main Snapshot: Full Web Dashboard (snap_full_dashboard.jpg) -->
      <p:pic>
        <p:nvPicPr><p:cNvPr id="6" name="FullDashPic"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>
        <p:blipFill><a:blip r:embed="rId_dash"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>
        <p:spPr>
          <a:xfrm><a:off x="800000" y="1520000"/><a:ext cx="10592000" cy="2700000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 1500"/></a:avLst></a:prstGeom>
          <a:ln w="25400"><a:solidFill><a:srgbClr val="10B981"/></a:solidFill></a:ln>
        </p:spPr>
      </p:pic>

      <!-- Bottom Snapshot 1: Top Heat Zones (snap_top_heatzones.png) -->
      <p:pic>
        <p:nvPicPr><p:cNvPr id="7" name="HeatZonesPic"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>
        <p:blipFill><a:blip r:embed="rId_zones"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>
        <p:spPr>
          <a:xfrm><a:off x="800000" y="4350000"/><a:ext cx="3350000" cy="2100000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 2000"/></a:avLst></a:prstGeom>
          <a:ln w="19050"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill></a:ln>
        </p:spPr>
      </p:pic>

      <!-- Bottom Snapshot 2: 3D Mapbox View (snap_3d_mapbox.png) -->
      <p:pic>
        <p:nvPicPr><p:cNvPr id="8" name="Mapbox3DPic"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>
        <p:blipFill><a:blip r:embed="rId_map3d"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>
        <p:spPr>
          <a:xfrm><a:off x="4421000" y="4350000"/><a:ext cx="3350000" cy="2100000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 2000"/></a:avLst></a:prstGeom>
          <a:ln w="19050"><a:solidFill><a:srgbClr val="10B981"/></a:solidFill></a:ln>
        </p:spPr>
      </p:pic>

      <!-- Bottom Snapshot 3: Projected Cooling (snap_projected_cooling.png) -->
      <p:pic>
        <p:nvPicPr><p:cNvPr id="9" name="CoolingChartPic"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>
        <p:blipFill><a:blip r:embed="rId_cool"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>
        <p:spPr>
          <a:xfrm><a:off x="8042000" y="4350000"/><a:ext cx="3350000" cy="2100000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 2000"/></a:avLst></a:prstGeom>
          <a:ln w="19050"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill></a:ln>
        </p:spPr>
      </p:pic>

    </p:spTree>
  </p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sld>"""

    rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
  <Relationship Id="rId_bg" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/image5.png"/>
  <Relationship Id="rId_footer" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/image8.png"/>
  <Relationship Id="rId_dash" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/snap_full_dashboard.jpg"/>
  <Relationship Id="rId_zones" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/snap_top_heatzones.png"/>
  <Relationship Id="rId_map3d" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/snap_3d_mapbox.png"/>
  <Relationship Id="rId_cool" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/snap_projected_cooling.png"/>
</Relationships>"""
    return xml, rels


# 3. Slide Content Matrix for all 24 slides (Point-Wise, No Two Boxes)
climora_slides = {
    # SLIDE 2: Abstract (Point-Wise + Full Dashboard Snapshot on Right)
    2: {
        "type": "with_image",
        "sec": "Section 1: Introduction and Problem Definition",
        "title": "Abstract",
        "image": "snap_full_dashboard.jpg",
        "img_w": 5100000, "img_h": 4900000,
        "bullets": [
            "Project Overview: Climora is an AI-assisted urban climate intelligence platform designed to detect, analyze, and mitigate Urban Heat Island (UHI) effects at street and neighborhood levels.",
            "Open Satellite Data: Ingests real-time and historical earth observation telemetry directly from the NASA POWER API combined with OpenStreetMap geospatial layers.",
            "Decision-Support Engine: Classifies urban heatzones from Normal (<28°C) to Extreme (>37°C) and models targeted green infrastructure cooling interventions.",
            "Active Production Deployment: Live in production and globally accessible at https://climora-dashboard.vercel.app/."
        ]
    },

    # SLIDE 3: Introduction (Wide Point-Wise)
    3: {
        "type": "wide",
        "sec": "Section 1: Introduction and Problem Definition",
        "title": "Introduction",
        "bullets": [
            "The Urban Heat Island (UHI) Phenomenon: Metropolitan urban centers routinely experience ambient temperatures 2°C to 7°C higher than surrounding rural baselines due to dense built infrastructure.",
            "Accelerators of Urban Heating: Proliferation of dark low-albedo asphalt surfaces, concrete structures, reduced vegetative canopy, and anthropogenic waste heat emissions.",
            "Need for Proactive Climate Intelligence: Shifts municipal administration from reactive disaster response to proactive, data-driven pre-summer cooling interventions.",
            "Street-Level Microclimate Precision: Moves beyond coarse city-wide temperature averages to expose hyper-local thermal disparities between concrete canyons and urban green spaces.",
            "Climora Mission: Delivering an open-access, browser-based decision-support platform for urban planners, municipal corporations, and environmental engineers."
        ]
    },

    # SLIDE 4: Problem Statement (Wide Point-Wise)
    4: {
        "type": "wide",
        "sec": "Section 1: Introduction and Problem Definition",
        "title": "Problem Statement",
        "bullets": [
            "Sparse Ground Station Infrastructure: Official meteorological stations (often placed at airports) fail to capture microclimate thermal pockets across diverse city wards.",
            "Rising Public Health Hazards: Extreme urban heat exacerbates cardiovascular and respiratory illnesses, heat exhaustion, and hospitalizations among outdoor workers and elderly citizens.",
            "Disproportionate Socioeconomic Vulnerability: Densely populated, low-income neighborhoods with minimal canopy cover bear the brunt of extreme thermal anomalies.",
            "Clunky Commercial GIS Tools: Software like ArcGIS requires expensive multi-thousand-dollar licenses, dedicated workstation GPUs, and steep training curves.",
            "Static, Non-Actionable Reporting: Traditional academic and municipal reports produce static PDF documents that fail to simulate or prioritize actionable green cooling solutions."
        ]
    },

    # SLIDE 5: Motivation (Wide Point-Wise)
    5: {
        "type": "wide",
        "sec": "Section 1: Introduction and Problem Definition",
        "title": "Motivation",
        "bullets": [
            "Protecting Vulnerable Communities: Urgent requirement to mitigate urban thermal stress for pedestrians, transit users, and vulnerable urban populations.",
            "Supporting UN Sustainable Development Goals: Directly advances United Nations SDG 11 (Sustainable Cities & Communities) and SDG 13 (Climate Action).",
            "Energy Grid Decarbonization: Lowering ambient street temperatures reduces peak summer air-conditioning electricity demand and grid overload.",
            "100% Client-Side Web Accessibility: A zero-install, zero-cloud-cost web application accessible instantly from any standard browser.",
            "Democratizing Earth Observation Telemetry: Translates complex NASA satellite solar radiation and temperature matrices into plain-English metrics.",
            "Empowering City Planners: Providing transparent cost-benefit and temperature-reduction calculations for municipal infrastructure budgets."
        ]
    },

    # SLIDE 6: Objectives (Wide Point-Wise)
    6: {
        "type": "wide",
        "sec": "Section 1: Introduction and Problem Definition",
        "title": "Objectives",
        "bullets": [
            "Automated Satellite Data Ingestion: Continuously fetch solar irradiance, surface skin temperature, and ambient air temperature from NASA POWER daily and monthly point APIs.",
            "Urban Heat Island Intensity (UHII) Modeling: Calculate localized temperature deltas (ΔT_UHI = T_urban - T_rural_baseline) across major Indian and global metropolitan areas.",
            "Dynamic Heatzone Severity Classification: Automatically categorize urban zones into Normal (<28°C), Moderate (28-32°C), High (33-37°C), and Extreme (>37°C) risk tiers.",
            "High-Performance 2D/3D WebGL Visualization: Render 3D building extrusions and thermal heat contours at 60 FPS using Mapbox GL and Leaflet.",
            "Targeted Green Infrastructure Synthesis: Synthesize site-specific cooling interventions (tree planting, cool roofs, bioswales) with quantified cooling impact and cost estimates.",
            "Multi-Format Stakeholder Reporting: Export standardized planning reports in CSV, JSON, and PNG formats for government decision-makers."
        ]
    },

    # SLIDE 7: Existing System (Wide Point-Wise)
    7: {
        "type": "wide",
        "sec": "Section 2: Existing and Proposed Systems",
        "title": "Existing System",
        "bullets": [
            "Government Meteorological Ground Stations: India Meteorological Department (IMD) and NOAA automated surface stations located primarily at airports.",
            "Commercial Desktop GIS Suites: Heavy desktop software suites including ESRI ArcGIS, ERDAS Imagine, and QGIS requiring manual data handling and desktop installs.",
            "Satellite Data Distribution Portals: Earth observation portals such as USGS EarthExplorer, NASA Earthdata, and Copernicus Open Access Hub.",
            "Manual Data Wrangling Workflow: Planners manually download massive GeoTIFF and NetCDF files, requiring extensive desktop preprocessing.",
            "Coarse Weather Applications: Citizens and city administrators rely on consumer weather applications that report a single average temperature for the entire city.",
            "Retrospective Policy Planning: Municipal cooling interventions are formulated reactively long after extreme summer heatwave seasons have concluded."
        ]
    },

    # SLIDE 8: Limitations of Existing System (Wide Point-Wise)
    8: {
        "type": "wide",
        "sec": "Section 2: Existing and Proposed Systems",
        "title": "Limitations of Existing System",
        "bullets": [
            "Low Spatial Resolution: Point readings from isolated ground stations cannot capture microclimate variances across adjacent urban streets and residential wards.",
            "Prohibitive Financial Barriers: Commercial GIS licenses cost thousands of dollars per seat, preventing widespread adoption by smaller municipal councils.",
            "High Technical Skill Barrier: Non-technical urban planners and municipal commissioners cannot easily query raw satellite NetCDF matrices.",
            "No Automated Cooling Recommendations: Traditional systems display heat maps but do not calculate where trees, bioswales, or cool roofs should be placed.",
            "Lack of Scenario Simulation: Planners cannot dynamically model how much a neighborhood would cool if green cover increased by 15% or 25%.",
            "Significant Reporting Latency: Remote-sensing academic studies take months or years to publish, missing critical pre-monsoon planning windows."
        ]
    },

    # SLIDE 9: Proposed System (Point-Wise + 3D Mapbox View Snapshot on Right)
    9: {
        "type": "with_image",
        "sec": "Section 2: Existing and Proposed Systems",
        "title": "Proposed System (Climora)",
        "image": "snap_3d_mapbox.png",
        "img_w": 4900000, "img_h": 4900000,
        "bullets": [
            "Unified Intelligence Platform: Climora combines NASA satellite observations, 3D WebGL mapping, and automated cooling algorithms into one web interface.",
            "Direct Satellite API Integration: Queries NASA POWER daily and monthly point APIs on demand for surface temperature, ambient air temperature, and solar irradiance.",
            "100% Client-Side Architecture: Executes all geospatial filtering, normalization, and zoning inside the browser—zero backend server overhead and zero latency.",
            "Dual-Engine Mapping: Mapbox GL 3D vector extrusions for high-end devices paired with an automated Leaflet 2D raster fallback for mobile/low-spec devices.",
            "Automated Mitigation Engine: Dynamically calculates cooling recommendations with estimated temperature drops (°C) and budget allocations."
        ]
    },

    # SLIDE 10: Advantages and Scope (Wide Point-Wise)
    10: {
        "type": "wide",
        "sec": "Section 2: Existing and Proposed Systems",
        "title": "Advantages and Scope",
        "bullets": [
            "Street-Level Spatial Precision: Identifies temperature variations between dense asphalt corridors and green parks within the same city.",
            "Zero Cloud Infrastructure Cost: Serverless Next.js architecture deployed on Vercel CDN requires zero server maintenance expense and scales infinitely.",
            "Instant Public Usability: Intuitive web UI with sliders, tabs, and plain-English summaries enables instant adoption by city officials.",
            "Open-Data Global Scalability: Directly connects to global NASA and NOAA APIs, scaling effortlessly to any city worldwide without custom sensor deployment.",
            "Smart City Missions: Prioritizing capital budget allocations for urban greening and cool pavements.",
            "Public Health Authorities: Issuing hyper-local heatwave advisories and positioning emergency cooling shelters.",
            "Urban Planners & Architects: Assessing thermal comfort indices before commercial and residential layout planning."
        ]
    },

    # SLIDE 11: Hardware and Software Requirements (Wide Point-Wise)
    11: {
        "type": "wide",
        "sec": "Section 3: Requirements and System Design",
        "title": "Hardware and Software Requirements",
        "bullets": [
            "Processor: Multi-core 64-bit CPU (Intel Core i5/i7 8th Gen+, AMD Ryzen 5+, or Apple Silicon M1/M2/M3).",
            "Memory (RAM): Minimum 8 GB RAM (16 GB recommended for multi-layer 3D Mapbox GL WebGL rendering).",
            "Graphics (GPU): WebGL 2.0 compatible integrated or dedicated GPU (Intel Iris Xe, NVIDIA GeForce, or Apple GPU).",
            "Network Bandwidth: Minimum 256 kbps stable connection for fetching NASA satellite point telemetry.",
            "Operating System: Windows 11 / macOS Sonoma / Ubuntu Linux 22.04 LTS.",
            "Runtimes & Build Tools: Node.js v20.x LTS, Bun / npm package manager, Git version control.",
            "Frameworks & UI: Next.js 16/15 (App Router), React 19, TypeScript 5.x, Tailwind CSS, Radix UI primitives.",
            "External APIs: NASA POWER Climate API (daily/monthly point APIs), NOAA weather.gov API, OpenStreetMap."
        ]
    },

    # SLIDE 12: Technology Stack (Wide Point-Wise)
    12: {
        "type": "wide",
        "sec": "Section 3: Requirements and System Design",
        "title": "Technology Stack",
        "bullets": [
            "Frontend & UI Layer: Next.js 16 (App Router) with React 19 and TypeScript for type-safe client-side state and responsive layouts.",
            "Styling & Components: Tailwind CSS for responsive dark-theme design tokens, Radix UI primitives (dropdown, slider, tooltip, tabs), and Lucide icons.",
            "Mapping & 3D WebGL: Mapbox GL JS (react-map-gl) for 3D building extrusions and vector heat choropleths; Leaflet (react-leaflet) as an optimized 2D fallback.",
            "Analytics & Visualization: Recharts SVG charting library (AreaChart, ResponsiveContainer) for time-series temperature trends and seasonal comparisons.",
            "State & Cache Management: Zustand for lightweight UI state orchestration (city, time slider, layer toggles); TanStack React Query for 24-hr satellite data caching.",
            "Data Providers & Standards: NASA POWER API (daily & monthly point endpoints), NOAA Weather Service, OpenStreetMap Nominatim, and GeoJSON standards."
        ]
    },

    # SLIDE 13: System Architecture (CUSTOM FULL-WIDTH DIAGRAM)
    13: {"custom": "architecture_slide"},

    # SLIDE 14: Microservices and Integration (Wide Point-Wise)
    14: {
        "type": "wide",
        "sec": "Section 3: Requirements and System Design",
        "title": "Microservices and Integration",
        "bullets": [
            "Dashboard Shell (DashboardShell.tsx): Manages navigation headers, city selector, active mode switches, and responsive side panels.",
            "GIS Map Viewport (MapboxMap.tsx / HeatMap.tsx): Controls camera coordinates, pitch, bearing, 3D building heights, and GeoJSON thermal polygon rendering.",
            "Analytics Engine (TemperatureChart.tsx): Parses multi-year NASA time-series to compute 10-year rolling averages and peak summer deviations.",
            "Recommendation Engine (lib/data.ts): Computes cost-to-benefit ratios for tree planting, reflective roofs, and bioswales.",
            "Reactive Data Flow: User city selection triggers TanStack query hooks ➔ calls NASA POWER point endpoint ➔ updates Zustand store ➔ renders GeoJSON layers.",
            "Multi-Format Export Flow: In-memory datasets convert seamlessly into CSV tables, JSON schemas, or PNG canvas snapshots for municipal reports."
        ]
    },

    # SLIDE 15: System Workflow (Wide Point-Wise)
    15: {
        "type": "wide",
        "sec": "Section 3: Requirements and System Design",
        "title": "System Workflow",
        "bullets": [
            "Step 1: User City Query: Urban planner selects a target city (e.g., Delhi, Bengaluru, Mumbai) and time window from the dashboard.",
            "Step 2: Geocoding & Bounding Resolution: City center coordinates and spatial bounding boxes are resolved using OpenStreetMap Nominatim.",
            "Step 3: Asynchronous Satellite Fetch: HTTP requests dispatched to NASA POWER daily and monthly point APIs for surface temperature (TS) and ambient temperature (T2M).",
            "Step 4: Normalization & UHI Delta Modeling: Temperature (°C), relative humidity (%), and solar irradiance (kW/m²) normalized against surrounding rural baselines.",
            "Step 5: Heatzone Severity Classification: Grid cells categorized into Low, Moderate, High, or Extreme heat zones.",
            "Step 6: 3D Spatial Rendering: Mapbox renders 3D building extrusions with thermal heat overlays and interactive tooltips.",
            "Step 7: Mitigation Synthesis & Export: Targeted cooling interventions generated with estimated temperature drops and budget estimates."
        ]
    },

    # SLIDE 16: Module Description (Wide Point-Wise)
    16: {
        "type": "wide",
        "sec": "Section 4: Modules and Implementation",
        "title": "Module Description",
        "bullets": [
            "City Geocoding & Boundary Module: Manages spatial bounding boxes, latitude/longitude centroids, and neighborhood boundaries.",
            "NASA Satellite Ingestion Module: Manages asynchronous API calls to NASA POWER, error handling, rate limiting, and client caching.",
            "UHI Analytics & Computation Module: Algorithms calculating urban heat island intensity deltas and 10-year historical trends.",
            "Interactive 2D/3D Map Viewport Module: High-performance WebGL map container rendering heat layers, building extrusions, and markers.",
            "Charting & Trends Module: Interactive Recharts components visualizing monthly temperature profiles and seasonal comparisons.",
            "Green Infrastructure Recommendation Module: Decision-support engine matching heat severity with actionable cooling interventions."
        ]
    },

    # SLIDE 17: Satellite Data Ingestion and API Processing (Wide Point-Wise)
    17: {
        "type": "wide",
        "sec": "Section 4: Modules and Implementation",
        "title": "Satellite Data Ingestion and API Processing",
        "bullets": [
            "Primary Data Source: NASA Prediction of Worldwide Energy Resources (POWER) project (power.larc.nasa.gov).",
            "T2M Parameter: Temperature at 2 Meters (ambient air temperature for public exposure analysis).",
            "TS Parameter: Earth Skin Surface Temperature (satellite radiative thermal reading across built surfaces).",
            "RH2M & Solar Irradiance: Relative Humidity at 2 Meters and All-Sky Surface Shortwave Downward Irradiance.",
            "API Endpoints: Daily and monthly point APIs queried using ISO date formats and precise decimal coordinates.",
            "Client Caching Strategy: API responses cached in browser memory (24-hour stale time) via TanStack React Query to eliminate redundant network traffic.",
            "Weather Forecast Fallback: Integrated NOAA weather.gov service provides immediate weather forecasts and temperature benchmarks."
        ]
    },

    # SLIDE 18: Heatzone Detection and Microclimate Modeling (Point-Wise + Top Heat Zones Snapshot on Right)
    18: {
        "type": "with_image",
        "sec": "Section 4: Modules and Implementation",
        "title": "Heatzone Detection and Microclimate Modeling",
        "image": "snap_top_heatzones.png",
        "img_w": 4600000, "img_h": 4900000,
        "bullets": [
            "Urban Heat Island Intensity (UHII) Formula: ΔT_UHI = T_urban - T_rural_baseline computed across seasonal cycles.",
            "Thermal Severity Tiers: Normal (<28°C), Moderate (28-32°C), High (33-37°C), Extreme (>37°C).",
            "Delhi Ground Validation Findings: Real-time analysis identifies 4 severe heat pockets across the capital:",
            "  • Dwarka: 43.9°C Extreme (Vulnerability Index: 85, Area: 1.45 km²).",
            "  • Okhla Industrial Area: 43.0°C Extreme (Vulnerability Index: 71, Area: 2.26 km²).",
            "  • Lajpat Nagar: 43.0°C Extreme (Vulnerability Index: 52, Area: 0.94 km²).",
            "  • Connaught Place: 40.3°C Extreme (Vulnerability Index: 46, Area: 1.12 km²)."
        ]
    },

    # SLIDE 19: Interactive 2D/3D Map Visualization (Point-Wise + 3D Mapbox View Snapshot on Right)
    19: {
        "type": "with_image",
        "sec": "Section 4: Modules and Implementation",
        "title": "Interactive 2D/3D Map Visualization",
        "image": "snap_3d_mapbox.png",
        "img_w": 4900000, "img_h": 4900000,
        "bullets": [
            "Hardware-Accelerated 3D WebGL: Mapbox GL JS dynamically extrudes building heights based on OpenStreetMap polygons at 60 FPS.",
            "Thermal Choropleths & Contours: Visual heat layers shift seamlessly across cool, moderate, high, and extreme color gradients.",
            "Dynamic Layer Toggles: Planners can toggle Heat Intensity, Vegetation Green Cover, Infrastructure Density, and Sensors.",
            "Interactive Camera Controls: 3D pitch (0° to 60°), bearing rotation, and zoom controls allow detailed inspection of street canyons.",
            "Low-Spec Fallback Engine: Leaflet 2D raster engine activates automatically for mobile devices and systems lacking WebGL 2.0."
        ]
    },

    # SLIDE 20: Real-Time Analytics and Mitigation (Point-Wise + Green Infra Snapshot on Right)
    20: {
        "type": "with_image",
        "sec": "Section 4: Modules and Implementation",
        "title": "Real-Time Analytics and Mitigation",
        "image": "snap_green_infra.png",
        "img_w": 4400000, "img_h": 4900000,
        "bullets": [
            "Multi-Year Temperature Profiling: Recharts area plots display historical daily highs, 10-year rolling means, and seasonal variance.",
            "Urban Canopy Expansion: Recommends strategic tree planting, estimating cooling drops between 1.2°C and 2.5°C across concrete wards.",
            "Cool Roofs & Reflective Coatings: Identifies high-density residential rooftops where reflective coatings lower surface heat by 3°C to 5°C.",
            "Quantified Delhi Intervention Summary: 8 Active Targeted Sites across 224.15 hectares with an average projected cooling of -1.6°C.",
            "Flyover Vertical Greenery: Critical priority, -1.8°C cooling effect across 10.97 hectares.",
            "Lake Restoration & Bioswales: High priority, -1.9°C to -2.1°C cooling effect across 62.58 hectares."
        ]
    },

    # SLIDE 21: Data Architecture and State Management (Wide Point-Wise)
    21: {
        "type": "wide",
        "sec": "Section 5: Database, Results and Conclusion",
        "title": "Data Architecture and State Management",
        "bullets": [
            "Zero-Server Database Architecture: Engineered as a 100% serverless, client-side application eliminating database maintenance and hosting costs.",
            "Strongly Typed TypeScript Models: Formal data structures defining CityStats, HeatZone, HeatDataPoint, CoolingRecommendation, and LayerConfig.",
            "Zustand Reactive Store (lib/store.ts): Minimalist client state management handling city selection, active layer visibility, and time slider filters.",
            "TanStack React Query Caching: 24-hour stale-time caching prevents redundant external API calls to NASA servers.",
            "High Availability (100% Uptime): Deployed on Vercel CDN; never suffers from database connection limits or backend downtime.",
            "Local Storage Persistence: User preferences, custom cities, and generated mitigation reports persist across browser sessions."
        ]
    },

    # SLIDE 22: Application Screenshots and Results (CUSTOM 4-SNAPSHOT GALLERY)
    22: {"custom": "screenshots_slide"},

    # SLIDE 23: Conclusion and Future Enhancements (Wide Point-Wise)
    23: {
        "type": "wide",
        "sec": "Section 5: Database, Results and Conclusion",
        "title": "Conclusion and Future Enhancements",
        "bullets": [
            "Project Achievements: Successfully developed Climora: an open, accessible urban climate intelligence dashboard for cities.",
            "Proved Satellite Feasibility: Validated the use of satellite earth observation for street-level urban heat island detection without costly ground sensors.",
            "Actionable Decision-Support: Combined intuitive 3D GIS visualization with practical, cost-estimated green infrastructure cooling solutions.",
            "Active Production Deployment: Verified live and accessible globally at https://climora-dashboard.vercel.app/.",
            "Drone Thermal Imaging: Ingesting ultra-high-resolution aerial infrared orthomosaics (<1 meter resolution).",
            "IoT Ground Sensor Telemetry: Streaming live data from LoRaWAN municipal air temperature and humidity micro-stations.",
            "Machine Learning Microclimate Forecasting: Predicting urban heatwave severity 7 days in advance using LSTM/Transformer models.",
            "Mobile Progressive Web App (PWA): Field deployment app for municipal health workers and tree plantation inspection officers."
        ]
    },

    # SLIDE 24: References and Thank You (Wide Point-Wise References + Callout)
    24: {
        "type": "wide",
        "sec": "Section 5: Database, Results and Conclusion",
        "title": "References and Thank You",
        "bullets": [
            "[1] NASA POWER Project: Prediction of Worldwide Energy Resources Solar & Meteorological Datasets (power.larc.nasa.gov).",
            "[2] U.S. EPA: Reducing Urban Heat Islands: Compendium of Strategies, Heat Island Mitigation Guidelines.",
            "[3] IPCC AR6 Report: Climate Change: Impacts, Adaptation and Vulnerability, Chapter on Urban Infrastructure.",
            "[4] Mapbox GL JS & React: WebGL 3D Building Extrusions, Vector Tile Specification and Custom Shaders.",
            "[5] OpenStreetMap Nominatim: Open Geospatial Data and Geocoding APIs for Global Boundaries.",
            "Institutional Mentorship: Department of Computer Science & Engineering, S.J.M. Institute of Technology, Chitradurga.",
            "Supervision: Under the esteemed guidance of Prof. Sagar K R, M.Tech. (Guide) and Dr. Krishnareddy K R, M.Tech., Ph.D. (HOD).",
            "Evaluation Discussion: Thank You! We invite questions, comments, and demonstration review from the Evaluation Committee."
        ]
    }
}

# 4. Generate all slides 2 to 24 (Slide 1 is untouched!)
slides_dir = os.path.join(build_dir, 'ppt/slides')
rels_dir = os.path.join(slides_dir, '_rels')

for num in range(2, 25):
    slide_xml_path = os.path.join(slides_dir, f'slide{num}.xml')
    rels_xml_path = os.path.join(rels_dir, f'slide{num}.xml.rels')
    cfg = climora_slides[num]

    if cfg.get('custom') == 'architecture_slide':
        s_xml, r_xml = build_slide13_arch_xml()
    elif cfg.get('custom') == 'screenshots_slide':
        s_xml, r_xml = build_slide22_gallery_xml()
    elif cfg.get('type') == 'with_image':
        s_xml, r_xml = build_pointwise_with_image_slide(
            slide_num=num,
            sec_title=cfg['sec'],
            slide_title=cfg['title'],
            bullets=cfg['bullets'],
            image_target=cfg['image'],
            image_width=cfg.get('img_w', 5000000),
            image_height=cfg.get('img_h', 4900000),
            accent="10B981",
            sec_color="38BDF8"
        )
    else: # wide point-wise
        s_xml, r_xml = build_pointwise_wide_slide(
            slide_num=num,
            sec_title=cfg['sec'],
            slide_title=cfg['title'],
            bullets=cfg['bullets'],
            accent="10B981",
            sec_color="38BDF8"
        )

    with open(slide_xml_path, 'w', encoding='utf-8') as f:
        f.write(s_xml)
    with open(rels_xml_path, 'w', encoding='utf-8') as f:
        f.write(r_xml)

print(f"[+] All 24 slide XMLs compiled with point-wise professional layouts!")

# 5. Update [Content_Types].xml
ct_path = os.path.join(build_dir, '[Content_Types].xml')
with open(ct_path, 'r', encoding='utf-8') as f:
    ct_content = f.read()

for i in range(1, 25):
    slide_part = f'<Override PartName="/ppt/slides/slide{i}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>'
    if slide_part not in ct_content:
        ct_content = ct_content.replace('</Types>', f'{slide_part}\n</Types>')

with open(ct_path, 'w', encoding='utf-8') as f:
    f.write(ct_content)

# 6. Update presentation.xml and rels
pres_xml_path = os.path.join(build_dir, 'ppt/presentation.xml')
with open(pres_xml_path, 'r', encoding='utf-8') as f:
    pres_content = f.read()

new_sldIdLst = "<p:sldIdLst>\n"
for i in range(1, 25):
    new_sldIdLst += f'    <p:sldId id="{255 + i}" r:id="rId_slide_{i}"/>\n'
new_sldIdLst += "  </p:sldIdLst>"

pres_content = re.sub(r'<p:sldIdLst>.*?</p:sldIdLst>', new_sldIdLst, pres_content, flags=re.DOTALL)
with open(pres_xml_path, 'w', encoding='utf-8') as f:
    f.write(pres_content)

pres_rels_path = os.path.join(build_dir, 'ppt/_rels/presentation.xml.rels')
clean_rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>
  <Relationship Id="rId_theme" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml"/>
"""
for i in range(1, 25):
    clean_rels += f'  <Relationship Id="rId_slide_{i}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide{i}.xml"/>\n'
clean_rels += "</Relationships>"

with open(pres_rels_path, 'w', encoding='utf-8') as f:
    f.write(clean_rels)

print(f"[+] presentation.xml and rels updated with 24 slides")

# 7. Pack into final PPTX
target_pptx = '/Users/bsudh/climora/climora-dashboard/Climora_Final_Presentation_24_Slides.pptx'
with zipfile.ZipFile(target_pptx, 'w', zipfile.ZIP_DEFLATED) as z:
    for root, dirs, files in os.walk(build_dir):
        for file in files:
            full = os.path.join(root, file)
            rel = os.path.relpath(full, build_dir)
            z.write(full, rel)

shutil.copyfile(target_pptx, '/Users/bsudh/climora/climora-dashboard/Climora_Final_Presentation.pptx')
shutil.copyfile(target_pptx, '/Users/bsudh/climora/climora-dashboard/IntelliClass_AI_Final_Presentation_24_Slides.pptx')
shutil.copyfile(target_pptx, '/Users/bsudh/.gemini/antigravity/brain/3a6b2e5d-a1ef-4d39-b669-aef36d03be8f/Climora_Final_Presentation_24_Slides.pptx')
shutil.copyfile(target_pptx, '/Users/bsudh/.gemini/antigravity/brain/3a6b2e5d-a1ef-4d39-b669-aef36d03be8f/.user_uploaded/media_1795000131185_98ed92a9.pptx')

print(f"[SUCCESS] Built final presentation at {target_pptx} ({os.path.getsize(target_pptx)/1024/1024:.2f} MB)")
