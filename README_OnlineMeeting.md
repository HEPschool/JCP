# README_OnlineMeeting

README_OnlineMeeting에서는 Online Meeting 및 관련 Material 등록·관리 방법을 안내합니다.  

## 주의 사항

등록·관리 과정에서 입력한 값들은 홈페이지 및 repository에 표시됩니다.  
입력된 값들과 업로드한 파일들은 홈페이지 및 repository 주소를 아는 모든 사용자들에 의해 열람/다운로드가 가능합니다.  
Materials 페이지에 표시되지 않는 파일도 정확한 주소를 알고 있다면 직접 접근할 수 있습니다.  
민감한 정보/자료 등록 및 업로드 시 주의해주시기 바랍니다.  
등록·관리에 앞서, 관리자에게 repository 편집 권한을 요청하시기 바랍니다.  

## Online Meeting 등록·관리

Online Meeting은 docs/_online 폴더에 .md 파일을 생성·수정하여 등록·관리할 수 있습니다.  
.md 파일의 이름은 Online Meeting 상세 페이지의 주소로 표시됩니다. (예: online meeting 01.md 파일의 상세 페이지 주소는 https://.../online/online-meeting-01)  
관리의 용이성을 위해, 파일 이름은 통일된 규칙으로 작성하는 것을 권장합니다.  

```yml
---
layout: online # 이 항목은 수정하지 않습니다.
title: "YOUR_TITLE"
date: 2026-12-25 14:00 +0900
series: "MEETING SERIES" # Online Meeting 페이지에서 미팅을 구분하는 명칭
speaker: "SPEAKER NAME"
note: "Online, Internal Meeting" # Online Meeting 페이지에서 표시되는 Note
textbook: "TEXTBOOK TITLE" # Optional: 상세 페이지 상단에 표시되는 교재
video: # Optional: 녹화 영상이 없다면 이 항목 전체를 삭제합니다.
  url: "https://www.youtube.com/watch?v=VIDEO_ID"
  display: "embed" # embed: 페이지 내 영상 표시, link: 링크 버튼만 표시
overview: > # 상세 페이지에서 표시되는 Overview
  Brief overview for the online meeting: YOUR_TITLE
timetable:
  - time: "14:00"
    title: "Opening Remarks"
    speaker: "Chair_1"
  - time: "14:10"
    title: "Presentation"
    speaker: "Speaker_1"
    material_id: "online_material_1"
  - time: "15:00"
    title: "Discussion"
    speaker: ""
participants: # Optional: 참가자 명단이 필요하지 않다면 이 항목 전체를 삭제합니다.
  - name: Panthera Pardus
    affiliation: Jeonbuk National University
photos: # Optional: 사진이 없다면 이 항목 전체를 삭제합니다.
  - "assets/img/photos/photo1.jpg"
hero: # Optional: 상세 페이지 상단에 표시되는 이미지와 문구
  image: "/assets/img/heros/event_default.jpg"
  lines:
    - text: "YOUR TITLE"
      style: title
    - text: "SPEAKER NAME"
      style: subtitle
    - text: "2026.12.25 (Fri)"
      style: text
---
```

series에는 Online Meeting의 운영 주체/성질 등을 기준으로 미팅을 구분하는 명칭을 입력합니다.  
textbook에는 미팅에서 사용한 교재를 입력하며, 해당 값이 없다면 교재 정보는 표시되지 않습니다.  
docs/_online 폴더에 .md 파일이 생성되면 Online Meeting 페이지에 일정 및 상세 페이지가 생성됩니다.  
Online Meeting 페이지에는 date 값을 기준으로 정렬된 순서로 일정이 표시됩니다.  
기본적으로 현재 연도의 일정이 표시되며, Select year 버튼에서 과거 및 미래 연도를 선택할 수 있습니다.  
Online Meeting 일정은 Home의 Upcoming Event banner와 상단의 Upcoming Event 링크에는 포함되지 않습니다.  

## Online Meeting Recording 등록·관리

녹화 영상은 Online Meeting의 .md 파일에 video 항목을 추가하여 등록합니다.  
video 또는 video.url이 없다면 상세 페이지에 Recording section이 생성되지 않습니다.  

```yml
video:
  url: "https://www.youtube.com/watch?v=VIDEO_ID"
  display: "embed"
```

display에는 embed 또는 link를 입력할 수 있습니다.  
embed는 Timetable과 Participants 사이의 Recording section에 영상을 직접 표시하고, 원본 YouTube 링크를 함께 제공합니다.  
link는 동일한 위치에 영상으로 이동하는 링크 버튼만 표시합니다.  
display를 생략하면 외부 영상을 자동으로 불러오지 않는 link 방식이 사용됩니다.  
embed 방식은 YouTube의 watch, youtu.be, embed, live, shorts 주소를 지원하며, 지원되지 않는 주소는 링크 방식으로 표시됩니다.  

## Online Meeting Material 등록·관리

Online Meeting Material은 docs/assets/materials/online 폴더에 파일을 업로드하고, docs/_data/online_materials.yml 파일을 수정하여 등록·관리할 수 있습니다.  

1. 등록하고자 하는 파일을 docs/assets/materials/online 폴더에 업로드합니다.  
2. docs/_data/online_materials.yml 파일을 열어 material의 정보를 입력합니다.  

```yml
- title: "Online Meeting Material"
  speaker: "Author Name"
  date: 2026-12-25
  file: "/assets/materials/online/Online Meeting Material.pdf"
  id: "online_material_1"
```

Online Meeting Material의 id에는 일반 Material과 쉽게 구분할 수 있도록 `online_` 접두사를 사용합니다.  
등록된 Online Meeting Material은 Materials 페이지에는 표시되지 않으며, Online Meeting 상세 페이지의 시간표를 통해서만 연결됩니다.  
파일은 홈페이지 접속이 가능한 누구나 직접 열람·다운로드할 수 있으므로, 열람을 제한하려면 파일에 비밀번호를 설정하는 등 별도의 조치를 취하시기 바랍니다.  

Online Meeting의 .md 파일에서 timetable 내 material_id에 자료의 id를 입력하면 해당 시간표에 자료 버튼이 표시됩니다.  
material_id에는 하나의 id 또는 여러 개의 id를 다음과 같이 입력할 수 있습니다.  

```yml
timetable:
  - time: "14:10"
    title: "Presentation 1"
    speaker: "Speaker_1"
    material_id: "online_material_1"
  - time: "15:10"
    title: "Presentation 2"
    speaker: "Speaker_2"
    material_id:
      - "online_material_2"
      - "online_supplement_1"
      - "online_supplement_2"
```

자료가 하나이면 click 버튼으로 표시됩니다.  
자료가 여러 개이면 입력한 순서대로 M, S1, S2... 버튼으로 표시됩니다.  
주 자료를 가장 앞에 입력하고, 보조 자료들을 중요한 순서대로 뒤이어 입력하시기 바랍니다.  
