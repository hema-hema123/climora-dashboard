import re
import os
import shutil
import zipfile
import xml.etree.ElementTree as ET

orig_pptx = '/Users/bsudh/.gemini/antigravity/brain/3a6b2e5d-a1ef-4d39-b669-aef36d03be8f/.user_uploaded/media_1795000131185_98ed92a9.pptx'
build_dir = '/Users/bsudh/climora/climora-dashboard/climora_24_build'

if os.path.exists(build_dir):
    shutil.rmtree(build_dir)
os.makedirs(build_dir, exist_ok=True)

# 1. Unpack original presentation to preserve exact theme, master, and original slide 1
with zipfile.ZipFile(orig_pptx, 'r') as z:
    z.extractall(build_dir)

print(f"[+] Original PPTX extracted successfully")

# 2. Copy high-res snapshots into ppt/media
media_dir = os.path.join(build_dir, 'ppt/media')
shutil.copyfile('public/snapshots/snapshot1_full_dashboard.png', os.path.join(media_dir, 'snap_dashboard.png'))
shutil.copyfile('public/snapshots/snapshot2_gis_heatmap.png', os.path.join(media_dir, 'snap_heatmap.png'))
shutil.copyfile('public/snapshots/snapshot3_analytics_chart.png', os.path.join(media_dir, 'snap_analytics.png'))
shutil.copyfile('public/snapshots/snapshot4_recommendations.png', os.path.join(media_dir, 'snap_recommendations.png'))
shutil.copyfile('public/climora-architecture-diagram.jpg', os.path.join(media_dir, 'snap_architecture.jpg'))
shutil.copyfile('public/dashboard-preview.png', os.path.join(media_dir, 'snap_preview.png'))

def xml_esc(text):
    text = str(text).replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')
    return text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

# Helper for standard two-card slide
def build_two_card_slide(slide_num, sec_title, slide_title, left_title, left_bullets, right_title, right_bullets, accent="10B981", sec_color="38BDF8"):
    left_ps = ""
    for b in left_bullets:
        left_ps += f"""<a:p>
          <a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr>
          <a:r>
            <a:rPr lang="en-US" sz="1300"><a:solidFill><a:srgbClr val="E2E8F0"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr>
            <a:t>{xml_esc(b)}</a:t>
          </a:r>
        </a:p>"""

    right_ps = ""
    for b in right_bullets:
        right_ps += f"""<a:p>
          <a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr>
          <a:r>
            <a:rPr lang="en-US" sz="1300"><a:solidFill><a:srgbClr val="E2E8F0"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr>
            <a:t>{xml_esc(b)}</a:t>
          </a:r>
        </a:p>"""

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
          <a:xfrm><a:off x="685800" y="380000"/><a:ext cx="4600000" cy="320000"/></a:xfrm>
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
        <p:spPr><a:xfrm><a:off x="685800" y="780000"/><a:ext cx="10820400" cy="620000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln/></p:spPr>
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

      <!-- Left Card -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="6" name="LeftCard"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="685800" y="1550000"/><a:ext cx="5250000" cy="4850000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 2800"/></a:avLst></a:prstGeom>
          <a:solidFill><a:srgbClr val="071A28"/></a:solidFill>
          <a:ln w="19050"><a:solidFill><a:srgbClr val="{accent}"/></a:solidFill></a:ln>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="250000" tIns="240000" rIns="250000" bIns="240000" anchor="t"/>
          <a:lstStyle/>
          <a:p>
            <a:r>
              <a:rPr lang="en-US" sz="1650" b="1"><a:solidFill><a:srgbClr val="{accent}"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr>
              <a:t>{xml_esc(left_title)}</a:t>
            </a:r>
          </a:p>
          <a:p><a:endParaRPr sz="600"/></a:p>
          {left_ps}
        </p:txBody>
      </p:sp>

      <!-- Right Card -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="7" name="RightCard"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="6256200" y="1550000"/><a:ext cx="5250000" cy="4850000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 2800"/></a:avLst></a:prstGeom>
          <a:solidFill><a:srgbClr val="071A28"/></a:solidFill>
          <a:ln w="19050"><a:solidFill><a:srgbClr val="1E293B"/></a:solidFill></a:ln>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="250000" tIns="240000" rIns="250000" bIns="240000" anchor="t"/>
          <a:lstStyle/>
          <a:p>
            <a:r>
              <a:rPr lang="en-US" sz="1650" b="1"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr>
              <a:t>{xml_esc(right_title)}</a:t>
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
  <Relationship Id="rId_bg" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/image5.png"/>
  <Relationship Id="rId_footer" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/image8.png"/>
</Relationships>"""
    return xml, rels


# Definition of all 24 slides for CLIMORA strictly following the 5 rubric images:
climora_slides = [
    # SLIDE 1: Title Slide (PRESERVED FROM ORIGINAL PPT)
    {"custom": "original_slide1"},

    # SLIDE 2: Abstract
    {
        "sec": "Section 1: Introduction and Problem Definition",
        "title": "Abstract",
        "left_title": "Project Overview & Core Vision",
        "left_bullets": [
            "Climora is an AI-assisted urban climate intelligence platform designed to detect, analyze, and mitigate Urban Heat Island (UHI) effects at street and neighborhood levels.",
            "Combines satellite climate observations (NASA POWER API) with open geospatial urban layers (OpenStreetMap) to deliver actionable thermal insights.",
            "Deployed live in production at https://climora-dashboard.vercel.app/ as an accessible decision-support tool for municipal teams."
        ],
        "right_title": "Technologies Used & Expected Outcomes",
        "right_bullets": [
            "Technologies Used: Next.js 16, React 19, TypeScript, Mapbox GL (3D extrusions), Leaflet, Recharts, Zustand, and NASA POWER API.",
            "Interactive Heatmaps: Real-time 2D and 3D geospatial visualizations classifying heatzones from Normal (<28°C) to Extreme (>37°C).",
            "Expected Outcome: Data-driven green infrastructure recommendations estimating cooling impact and implementation cost for urban planners."
        ],
        "accent": "10B981", "sec_color": "38BDF8"
    },

    # SLIDE 3: Introduction
    {
        "sec": "Section 1: Introduction and Problem Definition",
        "title": "Introduction",
        "left_title": "Urban Heat Islands & Climate Challenges",
        "left_bullets": [
            "Urban Heat Island (UHI) Phenomenon: Metropolitan centers experience ambient temperatures 2°C to 7°C warmer than rural surroundings.",
            "Root Drivers: Replacement of natural vegetation with dark concrete and asphalt surfaces that absorb and trap solar radiation.",
            "Need for Modern Climate Intelligence: Shifts urban planning from retrospective damage control to proactive, data-driven thermal mitigation."
        ],
        "right_title": "The Climora Decision-Support Platform",
        "right_bullets": [
            "Street-Level Insights: Identifies hyper-local temperature variances across neighborhoods, commercial hubs, and residential wards.",
            "Satellite Telemetry Integration: Eliminates the requirement for dense, expensive physical ground sensor networks.",
            "Actionable Sustainability: Empowers city corporations to simulate cooling interventions before committing public infrastructure capital."
        ],
        "accent": "10B981", "sec_color": "38BDF8"
    },

    # SLIDE 4: Problem Statement
    {
        "sec": "Section 1: Introduction and Problem Definition",
        "title": "Problem Statement",
        "left_title": "Limitations of Traditional Monitoring",
        "left_bullets": [
            "Sparse Ground Weather Stations: Airport weather stations represent a 20-50 km radius, completely missing microclimate variances across urban neighborhoods.",
            "Rising Public Health Risks: Heatwaves cause severe cardiovascular stress, heatstroke mortality, and heightened hospitalizations among vulnerable communities.",
            "Disproportionate Vulnerability: Low-income neighborhoods with minimal canopy cover experience severe thermal disparity."
        ],
        "right_title": "Lack of Integrated Intelligent Planning Tools",
        "right_bullets": [
            "Clunky Commercial Desktop GIS: Software like ArcGIS requires expensive licenses, dedicated GPUs, and specialized geospatial training.",
            "Static, Non-Actionable Reports: Traditional municipal assessments produce static PDFs that cannot simulate cooling scenarios.",
            "City-Wide Averaging Trap: Public weather apps show single city-wide numbers, masking street canyons where asphalt exceeds 45°C."
        ],
        "accent": "F43F5E", "sec_color": "FB7185"
    },

    # SLIDE 5: Motivation
    {
        "sec": "Section 1: Introduction and Problem Definition",
        "title": "Motivation",
        "left_title": "Need for Personalized Learning & Climate Resilience",
        "left_bullets": [
            "Protecting Vulnerable Citizens: Mitigating extreme heat risks for outdoor workers, children, and elderly citizens living in dense urban cores.",
            "Meeting Global Sustainability Goals: Directly supports United Nations SDG 11 (Sustainable Cities) and SDG 13 (Climate Action).",
            "Energy Grid Decarbonization: Reducing peak air-conditioning grid loads by lowering ambient neighborhood temperatures."
        ],
        "right_title": "Low-Bandwidth Communication & Public Access",
        "right_bullets": [
            "100% Client-Side Web Architecture: Zero installation, zero cloud server hosting cost, and instant access from any standard web browser.",
            "Democratizing Earth Observation: Translates complex NASA satellite solar radiation and temperature matrices into plain-English insights.",
            "Empowering City Planners: Delivers transparent cost-benefit estimations for green roofs, reflective pavements, and urban parks."
        ],
        "accent": "38BDF8", "sec_color": "7DD3FC"
    },

    # SLIDE 6: Objectives
    {
        "sec": "Section 1: Introduction and Problem Definition",
        "title": "Objectives",
        "left_title": "Data Ingestion & Analytical Objectives",
        "left_bullets": [
            "Satellite Ingestion: Continuously fetch solar irradiance, surface skin temperature, and air temperature via NASA POWER API.",
            "UHI Intensity Modeling: Compute localized Urban Heat Island Intensity (UHII) relative to surrounding rural baselines.",
            "Heatzone Classification: Automatically categorize urban zones into Normal, Moderate, High, and Extreme thermal severity tiers."
        ],
        "right_title": "Visualization & Decision-Support Objectives",
        "right_bullets": [
            "Interactive 2D/3D WebGL Mapping: Render 3D building extrusions and dynamic heat contours at 60 FPS using Mapbox GL and Leaflet.",
            "Automated Mitigation Synthesis: Generate actionable green infrastructure solutions with estimated cooling deltas and cost models.",
            "Multi-Format Reporting: Export stakeholder-ready reports in CSV, JSON, and PNG formats for municipal decision-makers."
        ],
        "accent": "10B981", "sec_color": "34D399"
    },

    # SLIDE 7: Existing System
    {
        "sec": "Section 2: Existing and Proposed Systems",
        "title": "Existing System",
        "left_title": "Current Monitoring Infrastructure",
        "left_bullets": [
            "Government Meteorological Stations: IMD / NOAA airport surface stations recording bulk regional weather parameters.",
            "Commercial Desktop GIS Suites: ESRI ArcGIS, ERDAS Imagine, and QGIS requiring manual data handling and desktop installs.",
            "Satellite Earth Observation Portals: USGS EarthExplorer, NASA Earthdata, and Copernicus Open Access Hub."
        ],
        "right_title": "Workflow in Existing Platforms",
        "right_bullets": [
            "Manual Data Wrangling: Planners manually download heavy GeoTIFF and NetCDF files, requiring days of GIS processing.",
            "Coarse Regional Weather Apps: Consumers and city officials rely on mobile weather apps reporting a single city-wide temperature.",
            "Retrospective Planning: Municipal cooling interventions are designed reactively long after devastating summer heatwave seasons."
        ],
        "accent": "F59E0B", "sec_color": "FBBF24"
    },

    # SLIDE 8: Limitations of Existing System
    {
        "sec": "Section 2: Existing and Proposed Systems",
        "title": "Limitations of Existing System",
        "left_title": "Technical & Spatial Bottlenecks",
        "left_bullets": [
            "Low Spatial Resolution: Ground stations fail to capture localized microclimate temperature spikes across adjacent wards.",
            "Prohibitive Financial Barriers: Commercial GIS software licenses cost thousands of dollars per seat, pricing out municipal councils.",
            "Steep Learning Curve: Complex geospatial desktop interfaces prevent city administrators and community advocates from using data."
        ],
        "right_title": "Functional & Interactivity Limitations",
        "right_bullets": [
            "No Automated Recommendations: Traditional tools display static heat contours without recommending where trees or cool roofs should go.",
            "Lack of Scenario Simulation: Planners cannot dynamically model how much a neighborhood would cool if green cover increased by 15%.",
            "High Latency & Delays: Academic remote-sensing studies take months to publish, missing critical pre-monsoon planning windows."
        ],
        "accent": "F43F5E", "sec_color": "FB7185"
    },

    # SLIDE 9: Proposed System
    {
        "sec": "Section 2: Existing and Proposed Systems",
        "title": "Proposed System (Climora)",
        "left_title": "The Climora Intelligence Platform",
        "left_bullets": [
            "AI-Assisted Web Platform: Climora combines NASA satellite data, geospatial mapping, and automated cooling algorithms into one web tool.",
            "Direct Satellite Integration: Fetches surface temperature, relative humidity, and solar radiation on demand via NASA POWER API.",
            "100% Client-Side Architecture: Executes all geospatial normalization and thermal zoning in the browser with zero server latency."
        ],
        "right_title": "Interactive Capabilities & Decision Support",
        "right_bullets": [
            "Dual Map Engine: Mapbox GL 3D building extrusions for high-end devices with an automatic Leaflet 2D raster fallback.",
            "Automated Heatzone Detection: Automatically identifies high-severity heat pockets and correlates them with road and canopy density.",
            "Actionable Cooling Simulation: Recommends specific green infrastructure interventions (cool roofs, parks) with estimated cost and temperature drop."
        ],
        "accent": "10B981", "sec_color": "34D399"
    },

    # SLIDE 10: Advantages and Scope
    {
        "sec": "Section 2: Existing and Proposed Systems",
        "title": "Advantages and Scope",
        "left_title": "Key Platform Advantages",
        "left_bullets": [
            "Street-Level Precision: Pinpoints microclimate temperature variations between dense asphalt corridors and green parks.",
            "Zero Cloud Infrastructure Cost: Serverless Next.js architecture deployed on Vercel CDN requires zero server maintenance overhead.",
            "Instant Usability: Intuitive web UI with sliders, tabs, and plain-English summaries enables instant adoption by city officials.",
            "Open-Data Scalability: Directly connects to global NASA and NOAA APIs, scaling effortlessly to any city worldwide."
        ],
        "right_title": "Target Users & Project Scope",
        "right_bullets": [
            "Smart City Missions & Municipal Corporations: Prioritizing capital budget allocations for urban greening and cool pavements.",
            "Public Health Authorities: Issuing hyper-local heatwave advisories and positioning emergency hydration stations.",
            "Urban Planners & Architects: Assessing thermal comfort indices before approving new commercial and residential developments."
        ],
        "accent": "38BDF8", "sec_color": "7DD3FC"
    },

    # SLIDE 11: Hardware and Software Requirements
    {
        "sec": "Section 3: Requirements and System Design",
        "title": "Hardware and Software Requirements",
        "left_title": "Hardware Specifications",
        "left_bullets": [
            "Processor: Multi-core 64-bit CPU (Intel Core i5/i7 8th Gen+, AMD Ryzen 5+, or Apple Silicon M-Series).",
            "Memory (RAM): Minimum 8 GB RAM (16 GB recommended for multi-layer 3D Mapbox GL WebGL rendering).",
            "Graphics: WebGL 2.0 compatible integrated or dedicated GPU (Intel Iris Xe, NVIDIA GeForce, or Apple GPU).",
            "Network Bandwidth: Minimum 256 kbps stable connection for fetching NASA satellite point telemetry."
        ],
        "right_title": "Software & Development Environment",
        "right_bullets": [
            "Operating System: Windows 11 / macOS Sonoma / Ubuntu Linux 22.04 LTS.",
            "Runtimes & Build Tools: Node.js v20.x LTS, Bun / npm package manager, Git version control.",
            "Frameworks: Next.js 16/15 (App Router), React 19, TypeScript 5.x, Tailwind CSS, Radix UI primitives.",
            "External APIs: NASA POWER Climate API (daily/monthly point APIs), NOAA weather.gov API, OpenStreetMap."
        ],
        "accent": "6366F1", "sec_color": "818CF8"
    },

    # SLIDE 12: Technology Stack
    {
        "sec": "Section 3: Requirements and System Design",
        "title": "Technology Stack",
        "left_title": "Frontend & Mapping Layer",
        "left_bullets": [
            "Next.js 16 & React 19: Server-rendered layout shells, client-side state transitions, and responsive dashboard views.",
            "Mapbox GL & react-map-gl: WebGL-powered 3D vector tile rendering with building extrusions and thermal choropleth layers.",
            "Leaflet & react-leaflet: Lightweight 2D fallback map engine ensuring smooth frame rates on low-spec client hardware.",
            "Recharts: Responsive SVG data charting for time-series temperature trends, monthly profiles, and UHI baseline deltas."
        ],
        "right_title": "State, Styling & Data Tier",
        "right_bullets": [
            "Zustand: Minimalist client-side reactive store managing active city, time intervals, active layers, and selected zones.",
            "TanStack React Query: Robust caching, background synchronization, and request deduplication for satellite API queries.",
            "Tailwind CSS & Radix UI: Accessible, responsive UI design with customized dark theme tokens and smooth animations.",
            "Data Sources: NASA POWER API (power.larc.nasa.gov), NOAA weather.gov, and OpenStreetMap."
        ],
        "accent": "38BDF8", "sec_color": "7DD3FC"
    },

    # SLIDE 13: System Architecture (CUSTOM ARCHITECTURE SLIDE)
    {"custom": "architecture_slide"},

    # SLIDE 14: Microservices and Integration
    {
        "sec": "Section 3: Requirements and System Design",
        "title": "Microservices and Integration",
        "left_title": "Component Responsibilities",
        "left_bullets": [
            "Dashboard Shell (DashboardShell.tsx): Manages top navigation, city selector, active mode switches, and responsive side panels.",
            "Map Viewport (MapboxMap.tsx / HeatMap.tsx): Controls camera coordinates, pitch, bearing, building 3D heights, and GeoJSON thermal polygon rendering.",
            "Analytics Engine (TemperatureChart.tsx): Parses multi-year NASA time-series to compute 10-year rolling averages and peak summer deviations.",
            "Recommendation Engine (lib/data.ts): Computes cost-to-benefit ratios for tree planting, reflective roofs, and water retention ponds."
        ],
        "right_title": "Inter-Component Data Integration",
        "right_bullets": [
            "Reactive State Flow: City selection triggers TanStack query hooks ➔ calls NASA POWER point endpoint ➔ updates Zustand store.",
            "GeoJSON Pipeline: Raw temperature metrics are normalized and dynamically mapped into GeoJSON FeatureCollections for map rendering.",
            "Multi-Format Export: In-memory datasets convert seamlessly into CSV tables, JSON schemas, or PNG canvas snapshots."
        ],
        "accent": "6366F1", "sec_color": "818CF8"
    },

    # SLIDE 15: System Workflow
    {
        "sec": "Section 3: Requirements and System Design",
        "title": "System Workflow",
        "left_title": "Stage 1: Data Acquisition & Geospatial Normalization",
        "left_bullets": [
            "1. User Query: Urban planner selects target city (e.g., Bengaluru, Delhi, Mumbai) and time window from the dashboard.",
            "2. Geocoding & Coordinate Resolution: City center coordinates and bounding coordinates are resolved.",
            "3. Satellite Data Fetch: Asynchronous HTTP request dispatched to NASA POWER daily and monthly point APIs.",
            "4. Normalization: Temperature (°C), relative humidity (%), and solar irradiance (kW/m²) extracted and normalized."
        ],
        "right_title": "Stage 2: UHI Computation, Mapping & Mitigation",
        "right_bullets": [
            "5. UHI Delta Computation: Urban temperatures compared against rural baseline to derive localized heat island intensity.",
            "6. Zone Severity Classification: Grid cells categorized into Low, Moderate, High, or Extreme heat zones.",
            "7. 3D Spatial Visualization: Mapbox renders 3D building heights with thermal heat overlays and interactive tooltips.",
            "8. Mitigation Synthesis: Targeted cooling interventions generated with estimated temperature drops and budget estimates."
        ],
        "accent": "10B981", "sec_color": "34D399"
    },

    # SLIDE 16: Module Description
    {
        "sec": "Section 4: Modules and Implementation",
        "title": "Module Description",
        "left_title": "Data & Location Management Modules",
        "left_bullets": [
            "City Geocoding & Boundary Module: Manages spatial bounding boxes, latitude/longitude centroids, and neighborhood boundaries.",
            "NASA Satellite Ingestion Module: Manages asynchronous API calls to NASA POWER, error handling, rate limiting, and client caching.",
            "UHI Analytics & Computation Module: Algorithms calculating urban heat island intensity deltas and 10-year historical trends."
        ],
        "right_title": "Visualization & Mitigation Modules",
        "right_bullets": [
            "Interactive 2D/3D Map Viewport: High-performance WebGL map container rendering heat layers, building extrusions, and markers.",
            "Charting & Trends Module: Interactive Recharts components visualizing monthly temperature profiles and seasonal comparisons.",
            "Green Infrastructure Recommendation Module: Decision-support engine matching heat severity with actionable cooling interventions."
        ],
        "accent": "38BDF8", "sec_color": "7DD3FC"
    },

    # SLIDE 17: Satellite Data Ingestion and API Processing
    {
        "sec": "Section 4: Modules and Implementation",
        "title": "Satellite Data Ingestion and API Processing",
        "left_title": "NASA POWER API Architecture",
        "left_bullets": [
            "Primary Data Source: NASA Prediction of Worldwide Energy Resources (POWER) project (power.larc.nasa.gov).",
            "Parameters Extracted: T2M (Temperature at 2 Meters), TS (Earth Skin Surface Temperature), RH2M (Relative Humidity), and ALLSKY_SFC_SW_DWN (Solar Irradiance).",
            "API Endpoints: Daily and monthly point APIs queried using ISO date formats and precise decimal coordinates."
        ],
        "right_title": "Ingestion Pipeline & Client Caching",
        "right_bullets": [
            "Request Pipeline: Encapsulated within useNASADailyTemperature and useHeatIslandComparison custom React Query hooks.",
            "Local Caching Strategy: API responses cached in browser memory to eliminate redundant network traffic during repeat city visits.",
            "Fallback Mechanisms: Integrated NOAA weather.gov service provides immediate weather forecasts and temperature benchmarks."
        ],
        "accent": "10B981", "sec_color": "34D399"
    },

    # SLIDE 18: Heatzone Detection and Microclimate Modeling
    {
        "sec": "Section 4: Modules and Implementation",
        "title": "Heatzone Detection and Microclimate Modeling",
        "left_title": "Urban Heat Island Intensity (UHII) Formula",
        "left_bullets": [
            "UHII Calculation: ΔT_UHI = T_urban - T_rural_baseline computed across seasonal and diurnal cycles.",
            "Thermal Classification Thresholds:",
            "  • Low / Normal: < 28°C (Standard baseline comfort zone).",
            "  • Moderate: 28°C - 32°C (Mild heat accumulation, light distress).",
            "  • High: 33°C - 37°C (Significant thermal stress, high concrete density).",
            "  • Extreme: > 37°C (Severe microclimate emergency requiring urgent interventions)."
        ],
        "right_title": "Correlation with Built Infrastructure",
        "right_bullets": [
            "Vegetation Index Correlation: Inverse correlation established between vegetative green canopy cover and surface temperature.",
            "Asphalt & Building Albedo: Dark low-albedo surfaces absorb up to 90% of solar radiation, re-radiating thermal energy into street canyons.",
            "Algorithmic Output: Generates structured HeatZone objects with centroid coordinates, severity labels, and affected population estimates."
        ],
        "accent": "6366F1", "sec_color": "818CF8"
    },

    # SLIDE 19: Interactive 2D/3D Map Visualization (CUSTOM MAP SLIDE WITH EMBEDDED SNAPSHOT)
    {"custom": "map_slide"},

    # SLIDE 20: Real-Time Analytics and Mitigation (CUSTOM ANALYTICS SLIDE WITH EMBEDDED SNAPSHOT)
    {"custom": "analytics_slide"},

    # SLIDE 21: Database Design / Data Architecture
    {
        "sec": "Section 5: Database, Results and Conclusion",
        "title": "Data Architecture and State Management",
        "left_title": "Client-Side Data Architecture",
        "left_bullets": [
            "Zero Server Database: Engineered as a 100% serverless, client-side application eliminating database maintenance costs.",
            "TypeScript Data Models: Strongly typed interfaces (CityStats, HeatZone, HeatDataPoint, CoolingRecommendation, LayerConfig).",
            "Zustand Store (lib/store.ts): Reactive UI state management handling city selection, active layer visibility, and time slider filters."
        ],
        "right_title": "Performance & Resilience Benefits",
        "right_bullets": [
            "High Availability (100% Uptime): Deployed on Vercel CDN; never suffers from database connection limits or backend downtime.",
            "TanStack React Query Caching: 24-hour stale-time caching prevents redundant external API calls to NASA servers.",
            "Local Storage Persistence: User preferences, custom cities, and generated mitigation reports persist across browser sessions."
        ],
        "accent": "F59E0B", "sec_color": "FBBF24"
    },

    # SLIDE 22: Application Screenshots and Results (CUSTOM SCREENSHOT GALLERY SLIDE)
    {"custom": "screenshots_slide"},

    # SLIDE 23: Conclusion and Future Enhancements
    {
        "sec": "Section 5: Database, Results and Conclusion",
        "title": "Conclusion and Future Enhancements",
        "left_title": "Project Achievements & Conclusion",
        "left_bullets": [
            "Successfully developed Climora: an open, accessible urban climate intelligence dashboard for cities.",
            "Proved the viability of satellite earth observation for street-level urban heat island detection without costly ground sensors.",
            "Combined intuitive 3D GIS visualization with practical, cost-estimated green infrastructure cooling solutions.",
            "Live active deployment verified and accessible at https://climora-dashboard.vercel.app/."
        ],
        "right_title": "Future Enhancements & Roadmap",
        "right_bullets": [
            "Drone Thermal Imaging Integration: Ingesting ultra-high-resolution aerial infrared orthomosaics (<1 meter resolution).",
            "IoT Ground Sensor Telemetry: Streaming live data from LoRaWAN municipal air temperature and humidity micro-stations.",
            "Machine Learning Microclimate Forecasting: Predicting urban heatwave severity 7 days in advance using LSTM/Transformer models.",
            "Mobile Progressive Web App (PWA): Field deployment app for municipal health workers and tree plantation inspection officers."
        ],
        "accent": "6366F1", "sec_color": "818CF8"
    },

    # SLIDE 24: References and Thank You (CUSTOM REFERENCES SLIDE)
    {"custom": "references_slide"}
]

# Generate custom slides with embedded pictures

def build_architecture_slide_xml():
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
          <a:xfrm><a:off x="685800" y="380000"/><a:ext cx="4600000" cy="320000"/></a:xfrm>
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
        <p:spPr><a:xfrm><a:off x="685800" y="780000"/><a:ext cx="10820400" cy="620000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln/></p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="0" tIns="0" rIns="0" bIns="0" anchor="ctr"/>
          <a:lstStyle/>
          <a:p>
            <a:r><a:rPr lang="en-US" sz="2600" b="1"><a:solidFill><a:srgbClr val="10B981"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>13. </a:t></a:r>
            <a:r><a:rPr lang="en-US" sz="2600" b="1"><a:solidFill><a:srgbClr val="F8FAFC"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>System Architecture</a:t></a:r>
          </a:p>
        </p:txBody>
      </p:sp>

      <!-- Architecture Diagram Image (snap_architecture.jpg) -->
      <p:pic>
        <p:nvPicPr><p:cNvPr id="6" name="ArchitectureDiagram"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>
        <p:blipFill><a:blip r:embed="rId_arch"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>
        <p:spPr>
          <a:xfrm><a:off x="685800" y="1550000"/><a:ext cx="6400000" cy="4850000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 2000"/></a:avLst></a:prstGeom>
          <a:ln w="25400"><a:solidFill><a:srgbClr val="10B981"/></a:solidFill></a:ln>
        </p:spPr>
      </p:pic>

      <!-- Architecture Component Explanation Card (Right) -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="7" name="ArchDetailsCard"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="7250000" y="1550000"/><a:ext cx="4256200" cy="4850000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 2800"/></a:avLst></a:prstGeom>
          <a:solidFill><a:srgbClr val="071A28"/></a:solidFill>
          <a:ln w="19050"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill></a:ln>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="200000" tIns="200000" rIns="200000" bIns="200000" anchor="t"/>
          <a:lstStyle/>
          <a:p><a:r><a:rPr lang="en-US" sz="1500" b="1"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>Client-Side Architecture</a:t></a:r></a:p>
          <a:p><a:endParaRPr sz="400"/></a:p>
          <a:p><a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr><a:r><a:rPr lang="en-US" sz="1200" b="1"><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>1. Presentation Tier: </a:t></a:r><a:r><a:rPr lang="en-US" sz="1200"><a:solidFill><a:srgbClr val="CBD5E1"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Next.js 16 App Router with React 19, Tailwind CSS, and Radix UI.</a:t></a:r></a:p>
          <a:p><a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr><a:r><a:rPr lang="en-US" sz="1200" b="1"><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>2. Mapping Engine: </a:t></a:r><a:r><a:rPr lang="en-US" sz="1200"><a:solidFill><a:srgbClr val="CBD5E1"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Mapbox GL 3D vector extrusions with automatic Leaflet fallback.</a:t></a:r></a:p>
          <a:p><a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr><a:r><a:rPr lang="en-US" sz="1200" b="1"><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>3. State &amp; Cache: </a:t></a:r><a:r><a:rPr lang="en-US" sz="1200"><a:solidFill><a:srgbClr val="CBD5E1"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Zustand for UI reactive state and TanStack React Query for 24-hr cache.</a:t></a:r></a:p>
          <a:p><a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr><a:r><a:rPr lang="en-US" sz="1200" b="1"><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>4. Data Engine: </a:t></a:r><a:r><a:rPr lang="en-US" sz="1200"><a:solidFill><a:srgbClr val="CBD5E1"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Direct asynchronous calls to NASA POWER and NOAA weather services.</a:t></a:r></a:p>
          <a:p><a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr><a:r><a:rPr lang="en-US" sz="1200" b="1"><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>5. Analytics: </a:t></a:r><a:r><a:rPr lang="en-US" sz="1200"><a:solidFill><a:srgbClr val="CBD5E1"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Recharts time-series trends and localized UHI intensity delta calculations.</a:t></a:r></a:p>
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
  <Relationship Id="rId_arch" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/snap_architecture.jpg"/>
</Relationships>"""
    return xml, rels


def build_map_slide_xml():
    xml = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld name="Slide 19">
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
          <a:xfrm><a:off x="685800" y="380000"/><a:ext cx="4600000" cy="320000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 50000"/></a:avLst></a:prstGeom>
          <a:solidFill><a:srgbClr val="072230"/></a:solidFill>
          <a:ln w="12700"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill></a:ln>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="100000" tIns="0" rIns="100000" bIns="0" anchor="ctr"/>
          <a:lstStyle/>
          <a:p><a:r><a:rPr lang="en-US" sz="1100" b="1"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>SECTION 4: MODULES AND IMPLEMENTATION</a:t></a:r></a:p>
        </p:txBody>
      </p:sp>

      <!-- Slide Title -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="5" name="Title"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr><a:xfrm><a:off x="685800" y="780000"/><a:ext cx="10820400" cy="620000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln/></p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="0" tIns="0" rIns="0" bIns="0" anchor="ctr"/>
          <a:lstStyle/>
          <a:p>
            <a:r><a:rPr lang="en-US" sz="2600" b="1"><a:solidFill><a:srgbClr val="10B981"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>19. </a:t></a:r>
            <a:r><a:rPr lang="en-US" sz="2600" b="1"><a:solidFill><a:srgbClr val="F8FAFC"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>Interactive 2D/3D Map Visualization</a:t></a:r>
          </a:p>
        </p:txBody>
      </p:sp>

      <!-- Left Technical Card -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="6" name="MapTechCard"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="685800" y="1550000"/><a:ext cx="5250000" cy="4850000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 2800"/></a:avLst></a:prstGeom>
          <a:solidFill><a:srgbClr val="071A28"/></a:solidFill>
          <a:ln w="19050"><a:solidFill><a:srgbClr val="10B981"/></a:solidFill></a:ln>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="250000" tIns="240000" rIns="250000" bIns="240000" anchor="t"/>
          <a:lstStyle/>
          <a:p><a:r><a:rPr lang="en-US" sz="1600" b="1"><a:solidFill><a:srgbClr val="10B981"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>Mapbox GL 3D &amp; Leaflet Engine</a:t></a:r></a:p>
          <a:p><a:endParaRPr sz="400"/></a:p>
          <a:p><a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr><a:r><a:rPr lang="en-US" sz="1250"><a:solidFill><a:srgbClr val="E2E8F0"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Hardware-Accelerated 3D WebGL: Mapbox GL JS dynamically extrudes building heights based on OpenStreetMap polygons.</a:t></a:r></a:p>
          <a:p><a:endParaRPr sz="300"/></a:p>
          <a:p><a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr><a:r><a:rPr lang="en-US" sz="1250"><a:solidFill><a:srgbClr val="E2E8F0"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Dynamic Heat Choropleths: Visual thermal layers shift seamlessly across normal, moderate, high, and extreme color gradients.</a:t></a:r></a:p>
          <a:p><a:endParaRPr sz="300"/></a:p>
          <a:p><a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr><a:r><a:rPr lang="en-US" sz="1250"><a:solidFill><a:srgbClr val="E2E8F0"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Multi-Layer Interactive Controls: Planners can toggle Heat Intensity, Vegetation Green Cover, Infrastructure Density, and Sensors.</a:t></a:r></a:p>
          <a:p><a:endParaRPr sz="300"/></a:p>
          <a:p><a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr><a:r><a:rPr lang="en-US" sz="1250"><a:solidFill><a:srgbClr val="E2E8F0"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Low-Spec Fallback: Leaflet 2D raster engine activates automatically for devices without WebGL 2.0 capabilities.</a:t></a:r></a:p>
        </p:txBody>
      </p:sp>

      <!-- Right Snapshot Image (snap_heatmap.png) -->
      <p:pic>
        <p:nvPicPr><p:cNvPr id="7" name="HeatmapSnapshot"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>
        <p:blipFill><a:blip r:embed="rId_heatmap"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>
        <p:spPr>
          <a:xfrm><a:off x="6256200" y="1550000"/><a:ext cx="5250000" cy="4850000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 2000"/></a:avLst></a:prstGeom>
          <a:ln w="25400"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill></a:ln>
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
  <Relationship Id="rId_heatmap" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/snap_heatmap.png"/>
</Relationships>"""
    return xml, rels


def build_analytics_slide_xml():
    xml = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld name="Slide 20">
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
          <a:xfrm><a:off x="685800" y="380000"/><a:ext cx="4600000" cy="320000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 50000"/></a:avLst></a:prstGeom>
          <a:solidFill><a:srgbClr val="072230"/></a:solidFill>
          <a:ln w="12700"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill></a:ln>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="100000" tIns="0" rIns="100000" bIns="0" anchor="ctr"/>
          <a:lstStyle/>
          <a:p><a:r><a:rPr lang="en-US" sz="1100" b="1"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>SECTION 4: MODULES AND IMPLEMENTATION</a:t></a:r></a:p>
        </p:txBody>
      </p:sp>

      <!-- Slide Title -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="5" name="Title"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr><a:xfrm><a:off x="685800" y="780000"/><a:ext cx="10820400" cy="620000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln/></p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="0" tIns="0" rIns="0" bIns="0" anchor="ctr"/>
          <a:lstStyle/>
          <a:p>
            <a:r><a:rPr lang="en-US" sz="2600" b="1"><a:solidFill><a:srgbClr val="10B981"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>20. </a:t></a:r>
            <a:r><a:rPr lang="en-US" sz="2600" b="1"><a:solidFill><a:srgbClr val="F8FAFC"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>Real-Time Analytics &amp; Mitigation</a:t></a:r>
          </a:p>
        </p:txBody>
      </p:sp>

      <!-- Left Technical Card -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="6" name="AnalyticsTechCard"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="685800" y="1550000"/><a:ext cx="5250000" cy="4850000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 2800"/></a:avLst></a:prstGeom>
          <a:solidFill><a:srgbClr val="071A28"/></a:solidFill>
          <a:ln w="19050"><a:solidFill><a:srgbClr val="10B981"/></a:solidFill></a:ln>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="250000" tIns="240000" rIns="250000" bIns="240000" anchor="t"/>
          <a:lstStyle/>
          <a:p><a:r><a:rPr lang="en-US" sz="1600" b="1"><a:solidFill><a:srgbClr val="10B981"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>Recharts Analytics &amp; Cooling Strategies</a:t></a:r></a:p>
          <a:p><a:endParaRPr sz="400"/></a:p>
          <a:p><a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr><a:r><a:rPr lang="en-US" sz="1250"><a:solidFill><a:srgbClr val="E2E8F0"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Multi-Year Temperature Profiling: Recharts area plots display historical daily highs, 10-year rolling means, and seasonal variance.</a:t></a:r></a:p>
          <a:p><a:endParaRPr sz="300"/></a:p>
          <a:p><a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr><a:r><a:rPr lang="en-US" sz="1250"><a:solidFill><a:srgbClr val="E2E8F0"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Urban Canopy Expansion: Recommends strategic tree planting, estimating cooling drops between 1.2°C and 2.5°C across concrete wards.</a:t></a:r></a:p>
          <a:p><a:endParaRPr sz="300"/></a:p>
          <a:p><a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr><a:r><a:rPr lang="en-US" sz="1250"><a:solidFill><a:srgbClr val="E2E8F0"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Cool Roofs &amp; Reflective Coatings: Identifies high-density residential rooftops where reflective coatings lower surface heat by 3°C to 5°C.</a:t></a:r></a:p>
          <a:p><a:endParaRPr sz="300"/></a:p>
          <a:p><a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr><a:r><a:rPr lang="en-US" sz="1250"><a:solidFill><a:srgbClr val="E2E8F0"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Budget &amp; Impact Models: Algorithmic cost-to-benefit ratios prioritize municipal intervention spending effectively.</a:t></a:r></a:p>
        </p:txBody>
      </p:sp>

      <!-- Top Snapshot Image: Analytics Chart (snap_analytics.png) -->
      <p:pic>
        <p:nvPicPr><p:cNvPr id="7" name="AnalyticsPic"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>
        <p:blipFill><a:blip r:embed="rId_chart"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>
        <p:spPr>
          <a:xfrm><a:off x="6256200" y="1550000"/><a:ext cx="5250000" cy="2350000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 2000"/></a:avLst></a:prstGeom>
          <a:ln w="19050"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill></a:ln>
        </p:spPr>
      </p:pic>

      <!-- Bottom Snapshot Image: Recommendations (snap_recommendations.png) -->
      <p:pic>
        <p:nvPicPr><p:cNvPr id="8" name="RecommendationsPic"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>
        <p:blipFill><a:blip r:embed="rId_recs"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>
        <p:spPr>
          <a:xfrm><a:off x="6256200" y="4050000"/><a:ext cx="5250000" cy="2350000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 2000"/></a:avLst></a:prstGeom>
          <a:ln w="19050"><a:solidFill><a:srgbClr val="10B981"/></a:solidFill></a:ln>
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
  <Relationship Id="rId_chart" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/snap_analytics.png"/>
  <Relationship Id="rId_recs" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/snap_recommendations.png"/>
</Relationships>"""
    return xml, rels


def build_screenshots_slide_xml():
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
          <a:xfrm><a:off x="685800" y="380000"/><a:ext cx="4900000" cy="320000"/></a:xfrm>
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
        <p:spPr><a:xfrm><a:off x="685800" y="780000"/><a:ext cx="10820400" cy="620000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln/></p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="0" tIns="0" rIns="0" bIns="0" anchor="ctr"/>
          <a:lstStyle/>
          <a:p>
            <a:r><a:rPr lang="en-US" sz="2600" b="1"><a:solidFill><a:srgbClr val="10B981"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>22. </a:t></a:r>
            <a:r><a:rPr lang="en-US" sz="2600" b="1"><a:solidFill><a:srgbClr val="F8FAFC"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>Application Screenshots and Results</a:t></a:r>
          </a:p>
        </p:txBody>
      </p:sp>

      <!-- Window 1: Live Web Dashboard (snap_dashboard.png) -->
      <p:pic>
        <p:nvPicPr><p:cNvPr id="6" name="DashboardPreview"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>
        <p:blipFill><a:blip r:embed="rId_dash"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>
        <p:spPr>
          <a:xfrm><a:off x="685800" y="1550000"/><a:ext cx="5250000" cy="2350000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 2000"/></a:avLst></a:prstGeom>
          <a:ln w="19050"><a:solidFill><a:srgbClr val="10B981"/></a:solidFill></a:ln>
        </p:spPr>
      </p:pic>

      <!-- Window 2: 3D Heatmap & Thermal Hotspots (snap_heatmap.png) -->
      <p:pic>
        <p:nvPicPr><p:cNvPr id="7" name="HeatmapPreview"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>
        <p:blipFill><a:blip r:embed="rId_heat"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>
        <p:spPr>
          <a:xfrm><a:off x="6256200" y="1550000"/><a:ext cx="5250000" cy="2350000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 2000"/></a:avLst></a:prstGeom>
          <a:ln w="19050"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill></a:ln>
        </p:spPr>
      </p:pic>

      <!-- Window 3: Recharts Temperature Trends (snap_analytics.png) -->
      <p:pic>
        <p:nvPicPr><p:cNvPr id="8" name="AnalyticsPreview"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>
        <p:blipFill><a:blip r:embed="rId_chart"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>
        <p:spPr>
          <a:xfrm><a:off x="685800" y="4050000"/><a:ext cx="5250000" cy="2350000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 2000"/></a:avLst></a:prstGeom>
          <a:ln w="19050"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill></a:ln>
        </p:spPr>
      </p:pic>

      <!-- Window 4: Mitigation Recommendations (snap_recommendations.png) -->
      <p:pic>
        <p:nvPicPr><p:cNvPr id="9" name="RecsPreview"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>
        <p:blipFill><a:blip r:embed="rId_recs"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>
        <p:spPr>
          <a:xfrm><a:off x="6256200" y="4050000"/><a:ext cx="5250000" cy="2350000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 2000"/></a:avLst></a:prstGeom>
          <a:ln w="19050"><a:solidFill><a:srgbClr val="10B981"/></a:solidFill></a:ln>
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
  <Relationship Id="rId_dash" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/snap_dashboard.png"/>
  <Relationship Id="rId_heat" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/snap_heatmap.png"/>
  <Relationship Id="rId_chart" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/snap_analytics.png"/>
  <Relationship Id="rId_recs" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/snap_recommendations.png"/>
</Relationships>"""
    return xml, rels


def build_references_slide_xml():
    xml = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld name="Slide 24">
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
          <a:xfrm><a:off x="685800" y="380000"/><a:ext cx="4900000" cy="320000"/></a:xfrm>
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
        <p:spPr><a:xfrm><a:off x="685800" y="780000"/><a:ext cx="10820400" cy="620000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln/></p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="0" tIns="0" rIns="0" bIns="0" anchor="ctr"/>
          <a:lstStyle/>
          <a:p>
            <a:r><a:rPr lang="en-US" sz="2600" b="1"><a:solidFill><a:srgbClr val="10B981"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>24. </a:t></a:r>
            <a:r><a:rPr lang="en-US" sz="2600" b="1"><a:solidFill><a:srgbClr val="F8FAFC"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>References and Thank You</a:t></a:r>
          </a:p>
        </p:txBody>
      </p:sp>

      <!-- Left Card: References & Documentation -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="6" name="RefsCard"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="685800" y="1550000"/><a:ext cx="5350000" cy="4850000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 2800"/></a:avLst></a:prstGeom>
          <a:solidFill><a:srgbClr val="071A28"/></a:solidFill>
          <a:ln w="19050"><a:solidFill><a:srgbClr val="10B981"/></a:solidFill></a:ln>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="250000" tIns="240000" rIns="250000" bIns="240000" anchor="t"/>
          <a:lstStyle/>
          <a:p><a:r><a:rPr lang="en-US" sz="1600" b="1"><a:solidFill><a:srgbClr val="10B981"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>Research Papers &amp; Documentation</a:t></a:r></a:p>
          <a:p><a:endParaRPr sz="400"/></a:p>
          <a:p><a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr><a:r><a:rPr lang="en-US" sz="1200" b="1"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>[1] NASA POWER Project: </a:t></a:r><a:r><a:rPr lang="en-US" sz="1200"><a:solidFill><a:srgbClr val="CBD5E1"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Prediction of Worldwide Energy Resources Solar &amp; Meteorological Datasets (power.larc.nasa.gov).</a:t></a:r></a:p>
          <a:p><a:endParaRPr sz="300"/></a:p>
          <a:p><a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr><a:r><a:rPr lang="en-US" sz="1200" b="1"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>[2] U.S. EPA: </a:t></a:r><a:r><a:rPr lang="en-US" sz="1200"><a:solidFill><a:srgbClr val="CBD5E1"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Reducing Urban Heat Islands: Compendium of Strategies, Heat Island Mitigation Guidelines.</a:t></a:r></a:p>
          <a:p><a:endParaRPr sz="300"/></a:p>
          <a:p><a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr><a:r><a:rPr lang="en-US" sz="1200" b="1"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>[3] IPCC AR6 Report: </a:t></a:r><a:r><a:rPr lang="en-US" sz="1200"><a:solidFill><a:srgbClr val="CBD5E1"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Climate Change: Impacts, Adaptation and Vulnerability, Chapter on Urban Infrastructure.</a:t></a:r></a:p>
          <a:p><a:endParaRPr sz="300"/></a:p>
          <a:p><a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr><a:r><a:rPr lang="en-US" sz="1200" b="1"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>[4] Mapbox GL JS &amp; React: </a:t></a:r><a:r><a:rPr lang="en-US" sz="1200"><a:solidFill><a:srgbClr val="CBD5E1"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>WebGL 3D Building Extrusions, Vector Tile Specification and Custom Shaders.</a:t></a:r></a:p>
          <a:p><a:endParaRPr sz="300"/></a:p>
          <a:p><a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr><a:r><a:rPr lang="en-US" sz="1200" b="1"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>[5] OpenStreetMap Nominatim: </a:t></a:r><a:r><a:rPr lang="en-US" sz="1200"><a:solidFill><a:srgbClr val="CBD5E1"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Open Geospatial Data and Geocoding APIs for Global Boundaries.</a:t></a:r></a:p>
        </p:txBody>
      </p:sp>

      <!-- Right Card: Supervision & Thank You Callout -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="7" name="SupervisionCard"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="6156200" y="1550000"/><a:ext cx="5350000" cy="4850000"/></a:xfrm>
          <a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 2800"/></a:avLst></a:prstGeom>
          <a:solidFill><a:srgbClr val="071A28"/></a:solidFill>
          <a:ln w="19050"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill></a:ln>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="250000" tIns="240000" rIns="250000" bIns="240000" anchor="t"/>
          <a:lstStyle/>
          <a:p><a:r><a:rPr lang="en-US" sz="1600" b="1"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>Technologies Used &amp; Mentorship</a:t></a:r></a:p>
          <a:p><a:endParaRPr sz="400"/></a:p>
          <a:p><a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr><a:r><a:rPr lang="en-US" sz="1200" b="1"><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Full Stack: </a:t></a:r><a:r><a:rPr lang="en-US" sz="1200"><a:solidFill><a:srgbClr val="CBD5E1"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Next.js 16, React 19, TypeScript, Mapbox GL, Leaflet, Recharts, Zustand, NASA POWER API.</a:t></a:r></a:p>
          <a:p><a:endParaRPr sz="300"/></a:p>
          <a:p><a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr><a:r><a:rPr lang="en-US" sz="1200" b="1"><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Department: </a:t></a:r><a:r><a:rPr lang="en-US" sz="1200"><a:solidFill><a:srgbClr val="CBD5E1"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Dept. of Computer Science &amp; Engineering, S.J.M.I.T, Chitradurga.</a:t></a:r></a:p>
          <a:p><a:endParaRPr sz="300"/></a:p>
          <a:p><a:pPr marL="280000" indent="-280000"><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr><a:r><a:rPr lang="en-US" sz="1200" b="1"><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Supervision: </a:t></a:r><a:r><a:rPr lang="en-US" sz="1200"><a:solidFill><a:srgbClr val="CBD5E1"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Prof. Sagar K R, M.Tech. (Guide) &amp; Dr. Krishnareddy K R, M.Tech., Ph.D. (HOD).</a:t></a:r></a:p>
          <a:p><a:endParaRPr sz="600"/></a:p>

          <!-- Embedded Thank You Box -->
          <a:p algn="ctr"><a:r><a:rPr lang="en-US" sz="2800" b="1"><a:solidFill><a:srgbClr val="10B981"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>Thank You!</a:t></a:r></a:p>
          <a:p algn="ctr"><a:endParaRPr sz="300"/></a:p>
          <a:p algn="ctr"><a:r><a:rPr lang="en-US" sz="1400" b="1"><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:latin typeface="Segoe UI Semibold"/></a:rPr><a:t>Open for Questions &amp; Discussion</a:t></a:r></a:p>
          <a:p algn="ctr"><a:r><a:rPr lang="en-US" sz="1200"><a:solidFill><a:srgbClr val="94A3B8"/></a:solidFill><a:latin typeface="Segoe UI"/></a:rPr><a:t>Evaluation Committee &amp; Faculty Review</a:t></a:r></a:p>
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


# 3. Generate all slides 2 to 24 (keeping Slide 1 untouched!)
slides_dir = os.path.join(build_dir, 'ppt/slides')
rels_dir = os.path.join(slides_dir, '_rels')

for num in range(2, 25):
    slide_xml_path = os.path.join(slides_dir, f'slide{num}.xml')
    rels_xml_path = os.path.join(rels_dir, f'slide{num}.xml.rels')
    slide_data = climora_slides[num - 1]

    if slide_data.get('custom') == 'architecture_slide':
        s_xml, r_xml = build_architecture_slide_xml()
    elif slide_data.get('custom') == 'map_slide':
        s_xml, r_xml = build_map_slide_xml()
    elif slide_data.get('custom') == 'analytics_slide':
        s_xml, r_xml = build_analytics_slide_xml()
    elif slide_data.get('custom') == 'screenshots_slide':
        s_xml, r_xml = build_screenshots_slide_xml()
    elif slide_data.get('custom') == 'references_slide':
        s_xml, r_xml = build_references_slide_xml()
    else:
        s_xml, r_xml = build_two_card_slide(
            slide_num=num,
            sec_title=slide_data['sec'],
            slide_title=slide_data['title'],
            left_title=slide_data['left_title'],
            left_bullets=slide_data['left_bullets'],
            right_title=slide_data['right_title'],
            right_bullets=slide_data['right_bullets'],
            accent=slide_data.get('accent', '10B981'),
            sec_color=slide_data.get('sec_color', '38BDF8')
        )

    with open(slide_xml_path, 'w', encoding='utf-8') as f:
        f.write(s_xml)
    with open(rels_xml_path, 'w', encoding='utf-8') as f:
        f.write(r_xml)

print(f"[+] All 24 slide XMLs generated successfully (Slide 1 preserved untouched)")

# 4. Update [Content_Types].xml for 24 slides
ct_path = os.path.join(build_dir, '[Content_Types].xml')
with open(ct_path, 'r', encoding='utf-8') as f:
    ct_content = f.read()

# Make sure all 24 slides are declared in Content_Types
for i in range(1, 25):
    slide_part = f'<Override PartName="/ppt/slides/slide{i}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>'
    if slide_part not in ct_content:
        ct_content = ct_content.replace('</Types>', f'{slide_part}\n</Types>')

with open(ct_path, 'w', encoding='utf-8') as f:
    f.write(ct_content)

print(f"[+] [Content_Types].xml updated for all 24 slides")

# 5. Update presentation.xml and presentation.xml.rels
pres_xml_path = os.path.join(build_dir, 'ppt/presentation.xml')
with open(pres_xml_path, 'r', encoding='utf-8') as f:
    pres_content = f.read()

# Build slideIdLst for 24 slides
new_sldIdLst = "<p:sldIdLst>\n"
for i in range(1, 25):
    new_sldIdLst += f'    <p:sldId id="{255 + i}" r:id="rId_slide_{i}"/>\n'
new_sldIdLst += "  </p:sldIdLst>"

# Replace sldIdLst in presentation.xml
pres_content = re.sub(r'<p:sldIdLst>.*?</p:sldIdLst>', new_sldIdLst, pres_content, flags=re.DOTALL)
with open(pres_xml_path, 'w', encoding='utf-8') as f:
    f.write(pres_content)

# Update ppt/_rels/presentation.xml.rels
pres_rels_path = os.path.join(build_dir, 'ppt/_rels/presentation.xml.rels')
with open(pres_rels_path, 'r', encoding='utf-8') as f:
    pres_rels_content = f.read()

# Remove existing slide relationships
pres_rels_root = ET.fromstring(pres_rels_content)
# Rebuild relationships cleanly
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

print(f"[+] presentation.xml and rels updated with all 24 slides")

# 6. Repack into final PPTX files
target_pptx1 = '/Users/bsudh/climora/climora-dashboard/Climora_Final_Presentation_24_Slides.pptx'
target_pptx2 = '/Users/bsudh/climora/climora-dashboard/IntelliClass_AI_Final_Presentation_24_Slides.pptx'
target_pptx3 = '/Users/bsudh/climora/climora-dashboard/Climora_Final_Presentation.pptx'
target_pptx4 = '/Users/bsudh/.gemini/antigravity/brain/3a6b2e5d-a1ef-4d39-b669-aef36d03be8f/Climora_Final_Presentation_24_Slides.pptx'
target_tmp = '/tmp/Climora_Final_Presentation_24_Slides.pptx'

with zipfile.ZipFile(target_pptx1, 'w', zipfile.ZIP_DEFLATED) as z:
    for root, dirs, files in os.walk(build_dir):
        for file in files:
            full = os.path.join(root, file)
            rel = os.path.relpath(full, build_dir)
            z.write(full, rel)

shutil.copyfile(target_pptx1, target_pptx2)
shutil.copyfile(target_pptx1, target_pptx3)
shutil.copyfile(target_pptx1, target_pptx4)
shutil.copyfile(target_pptx1, target_tmp)

print(f"[SUCCESS] Final 24-Slide Presentation built and saved:")
print(f" -> {target_pptx1} ({os.path.getsize(target_pptx1)/1024/1024:.2f} MB)")
