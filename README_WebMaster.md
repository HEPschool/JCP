# README_WebMaster

README_WebMaster에서는 홈페이지 전반의 관리, Survey 등록·관리, Poster 등록 방법을 안내합니다.  

## 주의 사항

등록·관리 과정에서 입력한 값들은 홈페이지 및 repository에 표시됩니다.  
입력된 값들은 홈페이지 및 repository 주소를 아는 모든 사용자들에 의해 열람/다운로드가 가능합니다.  
민감한 정보/자료 등록 및 업로드 시 주의해주시기 바랍니다.  
등록·관리에 앞서, 관리자에게 repository 편집 권한을 요청하시기 바랍니다.

## Survey 등록·관리

Home 화면에 노출되는 Survey의 기본 항목들은 Subscription, Registration, Presurvey 총 3가지 입니다.  
Subscription: JCP Newsletter 구독 신청  
Registration: 강연 참석 여부 설문 조사  
Presurvey: 강연 진행을 위한 사전 설문 조사 (Speaker의 요청이 있는 경우 진행. Speaker가 항목을 준비하고, 관리자가 설정하여 게시합니다.)  
각 Survey들은 정보는 docs/_data/surveys.Ymal 파일을 수정하여 등록·관리할 수 있습니다.  

```yml
- name: "Registration" # 설문 조사 이름 
  topic: "topic_01" # Optional: 안내 문구를 위한 설정값
  url: "https://your.google.forms.link" # 설문 조사 링크(Google forms 등)
  enabled: false # 설문 조사 진행 여부 (true/false)
```

name은 설문 조사의 이름으로, 해당 설정값이 Home 화면의 설문조사 단추 위에 표시됩니다.  
url은 설문 조사 참여 링크로, Google forms 등의 설문 조사 링크를 입력합니다.  
enabled는 설문 조사 진행 여부를 설정하는 항목으로, true면 Home 화면의 단추가 하늘색으로 활성화되고, false면 단추가 회색으로 비활성화 됩니다.  
topic은 안내 문구를 위한 설정값으로, topic이 입력되어 있고 enabled: true 인 경우, 아래와 같은 안내 문구가 Home 화면의 단추 하단에 표시됩니다.  
  
✅ (name) for (topic) is now open.  
  
위 문구는 docs/_includes/surveys.html 파일의 아래 부분을 수정하여 조정할 수 있습니다.  

```html
{%- if has_notes == 1 -%}
  <div class="survey-notes" role="status" aria-live="polite">
    {%- for b in site.data.surveys -%}
      {%- assign is_on = b.enabled | default: false -%}
      {%- assign topic_str = b.topic | default: '' | strip -%}
      {%- if is_on and topic_str != '' -%}
        <p class="survey-note">✅ <strong>{{ b.name }}</strong> for <strong>{{ topic_str }}</strong> is now open.</p>
      {%- endif -%}
    {%- endfor -%}
  </div>
{%- endif -%}
```

다른 설문 조사들이 필요하다면, docs/_data/surveys.Ymal 파일을 수정하여 새로운 설문 조사들을 등록·관리할 수 있습니다.  
Home 화면에 표시되는 Survey의 순서는 docs/_data/surveys.Ymal 파일에 입력된 순서를 따릅니다.  

## Poster 등록·관리

Home 화면에 표시되는 Poster는 docs/assets 폴더에 존재하는 이미지 파일 중, 이름이 poster 또는 이와 유사한 파일을 자동으로 색인하여 표시합니다.  
Poster 등록·관리를 위해서는, 해당 폴더에 존재하는 기존 poster 파일을 수정하거나, 기존 파일 제거 후 신규 파일을 업로드 합니다.  
오류 발생 방지를 위해, poster 또는 이와 유사한 이름을 가지는 파일은 하나만 업로드 해두는 것을 권장합니다.  

## Organizers 등록·관리

Home 화면에 표시되는 Organizers는 docs/_data/organizers.Ymal 파일을 수정하여 등록·관리할 수 있습니다.  

```yml
- name: "organizer name"
  affiliation: "organizer affiliation"
```

표시되는 순서는 docs/_data/organizers.Ymal 파일에 입력된 순서를 따릅니다.  
동일한 방식으로, Special Thanks 등록·관리를 수행할 수 있습니다.  

## Sponsors 등록·관리

Home 화면에 표시되는 Sponsors는 docs/_data/sponsors.Ymal 파일을 수정하여 등록·관리할 수 있습니다.

```yml
- name: "sponsor name"
  logo: "/assets/img/sponsors/sponsor_logo.png"
```

Sponsors를 등록하는 경우, docs/index.md 파일 내에 원하는 위치에 {% include sponsors.html %} 를 추가하시기 바랍니다.  
logo: "" 항목에 로고 이미지가 등록되어 있다면, 해당 로고 이미지만 표시됩니다.  
로고 이미지가 등록되어 있지 않다면, name: "" 항목의 이름이 표시됩니다.  
표시되는 순서는 로고 이미지가 등록된 스폰서 -> 로고 이미지가 등록되지 않은 스폰서이며, 로고 이미지는 한 줄로 나열하고, 스폰서 이름은 한 줄에 하나씩 표시됩니다.  
로고 이미지 및 스폰서 이름 안에서의 순서는 docs/_data/sponsors.Ymal 파일에 입력된 순서를 따릅니다.  
표시 방식의 세부 설정은 docs/_includes/sponsors.html 파일을 수정하여 조정할 수 있습니다.  

## 홈페이지 기초 설정·관리

홈페이지의 기초 설정들은 docs/_config.Ymal 파일에 입력되어 있습니다.  

```yml
title: Site Title # 홈페이지의 이름
description: Site description # 홈페이지의 짧은 설명 (카카오톡 등으로 링크를 공유할 때 표시됩니다.)
lang: en
baseurl: /repo_name # GitHub Repostiory 이름을 입력합니다.
url: https://org_name.github.io # org_name 부분에 Organization 이름을 입력합니다.
markdown: kramdown
timezone: Asia/Seoul
plugins:
#- jekyll-seo-tag
#- jekyll-jekyll-sitemap
kramdown:
  input: GFM
  hard_wrap: false
future: true
nav:
- name: Home
  url: /
- name: Schedule
  url: /schedule/
- name: Lecturers
  url: /lecturers/
- name: Materials
  url: /materials/
collections:
  events:
    output: true
    permalink: /events/:slug/
nav_next_label: Upcoming Event
```

신규 페이지 추가 시, nav: 하위 항목에 해당 페이지의 name 및 url을 추가합니다. (개별 페이지 설정·관리 (기초)를 참고하세요.)  
홈페이지 상단 네비게이션 바에 표시되는 각 페이지 순서는, nav에 설정된 순서를 따릅니다.  
Upcoming Event는 항상 두 번째 위치에 표시되며, 필요시 docs/_includes/header.html을 수정하여 조정할 수 있습니다.  

## favicon 등록·관리

favicon은 페이지 방문 시, 웹 브라우저의 탭 항목에 표시되는 작은 아이콘입니다.  
아이콘 이미지(.png)는 docs/assets/favicon에 업로드 합니다.  
기본 설정된 파일 이름 이외의 파일 이름을 사용하는 경우, docs/_includes/head.html 파일의 아래 부분을 적절하게 수정합니다.  

```html
<link rel="icon" type="image/png" sizes="16x16" href="{{ '/assets/favicon/favicon_16.png' | relative_url }}">
<link rel="icon" type="image/png" sizes="32x32" href="{{ '/assets/favicon/favicon_32.png' | relative_url }}">
<link rel="icon" type="image/png" sizes="64x64" href="{{ '/assets/favicon/favicon_64.png' | relative_url }}">
<link rel="icon" type="image/png" sizes="128x128" href="{{ '/assets/favicon/favicon_128.png' | relative_url }}">
<link rel="manifest" href="{{ '/assets/favicon/site.webmanifest' | relative_url }}">
<link rel="apple-touch-icon" href="{{ '/assets/favicon/favicon_256.png' | relative_url }}">
```

기본 설정된 favicon은 ${e^-}{e^+}\to{\mu^-}{\mu^+}$ 과정의 Feynman diagram을 Weinberg angle만큼 돌린 그림입니다.  

## footer 설정·관리

footer는 각 페이지 하단에 © something · something again 형태로 표시되는 문구입니다.  
docs/_includes/footer.html 파일을 수정하여 표시되는 문구를 설정·관리할 수 있습니다.  

## 개별 페이지 설정·관리 (기초)

기본 설정된 페이지는 Home, Upcoming Event, Schedule, Lecturers, Materials 총 5가지 입니다.  
Upcoming Event를 제외한 각 페이지들은 docs/ 폴더의 각 .md 파일에서 설정·관리할 수 있습니다.(Home 페이지는 index.md 파일에서 설정·관리)  
Upcoming Event의 경우, 등록된 일정 중 가장 가까운 일정(당일을 포함)의 상세 페이지를 자동으로 표시합니다.  
기초적인 페이지 설정·관리는 markdown 문법을 따라 파일을 작성·수정하여 할 수 있습니다.  
필요 시 동일한 디렉토리에 신규 .md 파일을 생성하고, docs/_config.Ymal 파일을 수정하여 신규 페이지를 등록할 수 있습니다.  

## Upcoming banner 등록·관리

Upcoming Event 페이지 표시와 동일한 매커니즘으로, Home 페이지에 자동으로 Upcoming banner가 생성됩니다.  
이 banner는 docs/_events 폴더에 존재하는 해당 event의 .md 파일에 hero image가 설정되어 있어야 정상적으로 표시되며, 동일 이미지를 사용하여 자동으로 banner를 만듭니다.  
Banner는 기본적으로 최상단에 "Upcoming Event" 문구를 표시하고, event의 .md 파일에서 title, location, date, speakers를 순서대로 읽어들여 표시합니다.  
Banner에 표시되는 항목들의 세부 설정은 docs/_includes/upcoming.html을 수정하여 변경할 수 있습니다.  

## 페이지 레이아웃 설정·관리  

각 페이지들의 기본 레이아웃은 docs/_layouts 폴더의 defalut.html과 event.html 파일에 설정되어 있습니다.  
모든 페이지들은 defalut.html의 레이아웃을 따르며, 각 Event의 상세 페이지는 event.html을 추가적으로 따릅니다.  
필요 시 해당 파일들을 적절히 수정하여 사용하거나, 신규 레이아웃 파일을 추가하여 사용할 수 있습니다.  
