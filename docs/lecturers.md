---
layout: default
permalink: /lecturers/
title: Lecturers
hero:
  image: "/assets/img/heros/talk.jpg"  # Optional
  title: "Lecturers"
---
# Lecturers

<div class="year-filter">
  <button id="lecturers-prev-toggle" class="btn small year-filter-btn" type="button">Select year</button>
  <span id="lecturers-current-year" class="year-filter-current"></span>
</div>
<div id="lecturers-year-filter" class="year-scroll" hidden></div>
<p id="lecturers-empty" class="year-filter-empty" hidden>No lecturers available for the selected year.</p>

<div id="lecturers-grid" class="grid grid-2">
  {% assign people = site.data.lecturers | sort: "date" %}
  {% for p in people %}
    {% assign photo = p.photo | default: '/assets/img/default-lecturer.svg' %}
    <div class="card lecturer-item" data-year="{{ p.date | date: '%Y' }}">
      <img src="{{photo | relative_url}}" alt="{{p.name}}" style="width:100%;max-height:220px;object-fit:cover;border-radius:8px;margin-bottom:.5rem">
      <h3 style="margin:.2rem 0">{{p.name}}</h3>
      <div style="color:#666;margin:0.5rem 0; line-height:1.2">{{p.affiliation}}</div>
      <div style="color:#666;margin:-0.5rem 0">{{p.email}}</div>
      {% if p.date %}<div style="color:#666;margin:.5rem 0 0">Lecture date: {{ p.date | date: "%Y.%m.%d" }}</div>{% endif %}
      <p style="margin-top:.75rem">{{p.intro}}</p>
    </div>
  {% endfor %}
</div>

<script>
  (function () {
    var currentYear = String(new Date().getFullYear());
    var filterRoot = document.getElementById("lecturers-year-filter");
    var toggleBtn = document.getElementById("lecturers-prev-toggle");
    var currentYearText = document.getElementById("lecturers-current-year");
    var grid = document.getElementById("lecturers-grid");
    var emptyNote = document.getElementById("lecturers-empty");
    if (!filterRoot || !grid || !toggleBtn || !currentYearText) return;

    var cards = Array.prototype.slice.call(grid.querySelectorAll(".lecturer-item[data-year]"));
    var years = Array.from(new Set(cards.map(function (card) {
      return card.getAttribute("data-year");
    }).filter(Boolean))).sort(function (a, b) {
      return Number(b) - Number(a);
    });
    years = years.filter(function (year) {
      return Number(year) <= Number(currentYear);
    });
    if (!years.length) years = [currentYear];

    var selectedYear = currentYear;

    function applyFilter() {
      var visibleCount = 0;
      cards.forEach(function (card) {
        var show = card.getAttribute("data-year") === selectedYear;
        card.style.display = show ? "" : "none";
        if (show) visibleCount += 1;
      });
      if (emptyNote) emptyNote.hidden = visibleCount > 0;
      currentYearText.textContent = "Selected year: " + selectedYear;
    }

    function renderYearButtons() {
      filterRoot.innerHTML = "";
      years.forEach(function (year) {
        var button = document.createElement("button");
        button.type = "button";
        button.className = "btn small year-filter-btn" + (year === selectedYear ? " is-active" : "");
        button.textContent = year;
        button.addEventListener("click", function () {
          selectedYear = year;
          renderYearButtons();
          applyFilter();
        });
        filterRoot.appendChild(button);
      });
    }

    toggleBtn.addEventListener("click", function () {
      filterRoot.hidden = !filterRoot.hidden;
    });

    renderYearButtons();
    applyFilter();
  })();
</script>
