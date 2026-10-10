# README_Series

Series는 행사들을 각 행사의 성격에 따라 분류하고 각 분류의 목표와 운영 계획을 소개하는 페이지입니다.
docs/_series 폴더에 .md 파일을 추가하면 Series 카드와 상세 페이지가 생성됩니다.

## Series 등록

```yaml
---
layout: series
series_id: "Student Lecture"
title: "Student Lecture"
subtitle: "Brief event description"
period:
  start: "2025-11-08"
  end: "present"
color: "#4F46E5"
hero:
  image: "/assets/img/heros/lecture/lecture_default.jpg"
  title: "Student Lecture"
---

Description introducing the series written in Markdown.

## Title 1

Contents 1

## Title 2

Contents 2

...
```

series_id는 다른 Series와 중복되지 않는 연결 기준입니다.
행사 파일의 series에 정확히 같은 값을 입력합니다.
Schedule과 Online Meeting 표에는 series_id가 표시되며, Series 카드와 상세 페이지에는 title이 표시됩니다.
제목을 바꾸더라도 series_id를 유지하면 행사 연결은 유지됩니다.
파일 이름은 상세 페이지의 주소로 사용됩니다.
예를 들어 student lecture.md는 /JCP/series/student-lecture/로 연결됩니다.

subtitle은 카드 제목 아래에 표시되는 선택 항목입니다.
생략하거나 빈 값으로 두면 문구 영역을 표시하지 않습니다.

소개, 목표, 계획, 일정표 등 상세 페이지 내용은 front matter 아래의 마크다운 본문에 자유롭게 작성합니다.
상세 페이지의 기간은 제목 아래에 본문과 같은 색상의 큰 글씨로 표시됩니다.
Hero 이미지가 없으면 카드에는 제목, 기간과 선택한 문구가 표시됩니다.
가급적 hero 항목을 완전히 설정해주시고, 적절한 image가 없는 경우 /assets/img/heros/series/series_default.jpg를 사용해주시기 바랍니다.

## 기간과 표시 순서

Series 기간은 period.start와 period.end에 입력합니다.
날짜는 따옴표로 감싼 YYYY-MM-DD 형식을 사용합니다.
종료일은 시작일보다 빠를 수 없습니다.

종료일 미정은 present, ongoing, TBD, 미정, 빈 문자열, 또는 end 생략으로 입력할 수 있습니다.
영문 표기는 대소문자를 구분하지 않습니다.
종료일이 없는 Series도 시작일이 미래이면 Upcoming Series로 분류됩니다.

| 구분 | 조건 | 정렬 |
|---|---|---|
| Ongoing Series | 시작일이 오늘 이전 또는 당일이며, 종료일이 없거나 오늘 이후 또는 당일 | 시작일 오름차순 |
| Upcoming Series | 시작일이 오늘보다 미래 | 시작일 오름차순 |
| Past Series | 종료일이 오늘보다 과거 | 종료일 내림차순 |

같은 날짜이면 제목, 그다음 series_id로 정렬합니다.
분류는 페이지 방문 시 한국 시간(Asia/Seoul)의 날짜를 기준으로 갱신됩니다.
JavaScript가 비활성화되어 있으면 빌드 시점의 분류와 정렬이 표시됩니다.
Series 기간은 직접 관리하며, 마지막 행사 날짜를 자동으로 종료일로 사용하지 않습니다.

## 행사 연결과 일정표

docs/_events와 docs/_online의 행사 파일에 다음과 같이 입력합니다.

```yaml
series: "Student Lecture"
```

Schedule과 Online Meeting의 Series 셀은 해당 Series 상세 페이지로 연결됩니다.
나머지 행 영역과 행사 제목은 행사 상세 페이지로 연결됩니다.
해당 Series 문서가 없으면 배경색 없이 분류명만 표시됩니다.

Series 상세 페이지의 최하단에는 두 컬렉션에서 series가 일치하는 모든 행사가 표시됩니다.
날짜가 오래된 순서이며, 연도 필터와 Series 열은 표시하지 않습니다.
이벤트가 없는 Series도 만들 수 있으며, 하단에 안내 문구가 표시됩니다.

## 캘린더 형태의 일정 오버뷰

여러 날에 걸친 Series는 날짜를 가로축, 시간을 세로축으로 표시하는 캘린더를 본문에 넣을 수 있습니다.
Series별 캘린더 자료는 docs/_series/programmes/의 .yml 파일로 관리합니다.
사이트 공통 자료를 저장하는 docs/_data와 구분하여 관리합니다.

### 캘린더 파일 작성

docs/_series/programmes/example_program.yml을 만들고 아래 형식으로 작성합니다.

```yaml
---
programme_id: "example_program"
permalink: /series/programmes/:slug.yml
programme:
  title: "Example Program"
  start_hour: 9
  end_hour: 18
  days:
    - date: "2028-06-26"
      url: "/events/example-program-day-1/"
      sessions:
        - start: "09:00"
          end: "10:30"
          title: "Introduction"
          speaker: "Speaker name"
          kind: lecture
        - start: "13:00"
          end: "15:00"
          title: "Practice"
          detail: "Problem solving"
          kind: practice
    - date: "2028-06-27"
      sessions:
        - start: "09:00"
          end: "10:30"
          title: "Discussion"
          kind: discussion
...
```

programme_id는 캘린더 자료를 찾는 고유 식별자이며, 다른 자료 파일과 중복되지 않도록 지정합니다.
행사를 연결하는 series_id와는 별도의 항목입니다.
permalink는 자료 문서의 출력 경로를 소개 페이지와 구분하여 주소 충돌을 방지합니다.
예시의 /series/programmes/:slug.yml을 그대로 사용합니다.
programme 아래에 캘린더 제목, 시간 범위, 날짜와 세션을 작성합니다.

| 항목 | 작성 방법 |
| --- | --- |
| title | 캘린더 이름 |
| start_hour, end_hour | 캘린더의 시작·종료 시각을 정수로 입력; 예: 9, 18 |
| days | 표시할 날짜를 오래된 순서로 작성; 입력 순서대로 열이 표시됨 |
| date | 따옴표로 감싼 YYYY-MM-DD |
| url | 선택 항목; 해당 날짜의 Event 페이지 주소를 /events/.../ 형식으로 입력 |
| sessions | 해당 날짜의 세션들을 시작 시각 순으로 작성 |
| start, end | 따옴표로 감싼 HH:MM; 전체 시간 범위 안에서, 종료 시각은 시작 시각보다 늦게 설정 |
| title (세션) | 블록에 표시할 제목 |
| speaker, detail | 선택 항목; 제목 아래에 표시할 강연자 또는 짧은 설명 |
| kind | 아래 표의 세션 종류 중 하나 |

시간대는 KST(UTC+9)이며, 블록은 10분 단위로 배치합니다.
start와 end의 분은 00, 10, 20, 30, 40, 50 중 하나로 입력합니다.
같은 날짜의 세션들이 서로 겹치지 않도록 작성하고, 휴식은 블록 사이의 빈 공간으로 표현합니다.
일자별 상세 시간표는 각 Event 문서에서 관리하며, 오버뷰와 같은 일정으로 유지합니다.

| kind | 표시 종류 |
| --- | --- |
| lecture | 강의 |
| practice | 실습 |
| discussion | 토론 |
| meal | 식사 |
| ceremony | 등록·개회·폐회 |
| social | 만찬 등 교류 행사 |

### Series 본문에 삽입

해당 Series의 .md 파일 본문의 원하는 위치에 다음 한 줄을 추가합니다.
id에는 자료 파일의 programme_id를 정확히 입력합니다.

```liquid
{% include week_programme.html id="example_program" %}
```

캘린더 자료가 없는 Series는 이 include를 넣지 않으면 됩니다.
url이 있는 날짜 제목은 Event 페이지로 연결되며, /JCP 등 사이트의 baseurl은 자동으로 적용됩니다.
url을 생략한 날짜는 링크 없이 표시됩니다.
날짜 수에 따라 열 수가 바뀌며, 좁은 화면에서는 가로로 스크롤할 수 있습니다.

programme_id가 있는 자료 문서는 일반 Series 카드 목록에서 제외됩니다.

## Series 셀 색상

color에는 #RRGGBB 형식의 색상을 입력합니다.

```yaml
color: "#4F46E5"
```

Schedule과 Online Meeting의 Series 셀 전체 배경에 해당 색상을 적용합니다.
모든 Series 색상에는 왼쪽에서 오른쪽으로 투명해지는 공통 그라데이션을 적용합니다.
셀의 왼쪽 40%는 지정 색상을 유지하고, 이후 오른쪽 끝까지 점차 옅어집니다.
배경의 기본 불투명도는 15%이며, 글자는 투명하게 만들지 않습니다.
농도는 docs/assets/css/style.css의 .series-cell에서 --series-opacity를 조절합니다.
color를 생략하거나 빈 값으로 두면 배경색을 적용하지 않습니다. 형식이 올바르지 않은 색상도 배경색 없이 표시됩니다.
