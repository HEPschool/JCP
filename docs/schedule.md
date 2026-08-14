---
layout: default
permalink: /schedule/
title: Schedule
hero:
  image: "/assets/img/heros/schedule.jpg"  # Optional
  title: "Schedule"
---
# Schedule

You can view the details of each event by clicking on it.

<div class="year-filter">
  <button id="schedule-prev-toggle" class="btn small year-filter-btn" type="button">Select year</button>
  <span id="schedule-current-year" class="year-filter-current"></span>
</div>
<div id="schedule-year-filter" class="year-scroll" hidden></div>
<p id="schedule-empty" class="year-filter-empty" hidden>No events available for the selected year.</p>

<table id="schedule-table">
<thead>
  <tr><th>Date/Time</th><th>Title</th><th>Speaker</th><th>Location</th><th>Note</th></tr>
</thead>
<tbody>
{% assign all = site.events | sort: 'date' %}
{% for ev in all %}
<tr data-year="{{ ev.date | date: '%Y' }}" onclick="location.href='{{ ev.url | relative_url }}'" style="cursor:pointer">
  <td>{{ ev.date | date: "%Y.%m.%d (%a) %H:%M" }}</td>
  <td>{{ ev.title }}</td>
  <td>{{ ev.speaker | default: "TBD" }}</td>
  <td>{{ ev.location }}</td><td>{{ ev.note | default: '' }}</td>
</tr>
{% endfor %}
</tbody>
</table>

<script>
  (function () {
    var currentYear = String(new Date().getFullYear());
    var filterRoot = document.getElementById("schedule-year-filter");
    var toggleBtn = document.getElementById("schedule-prev-toggle");
    var currentYearText = document.getElementById("schedule-current-year");
    var table = document.getElementById("schedule-table");
    var emptyNote = document.getElementById("schedule-empty");
    if (!filterRoot || !table || !toggleBtn || !currentYearText) return;

    var rows = Array.prototype.slice.call(table.querySelectorAll("tbody tr[data-year]"));
    var years = Array.from(new Set(rows.map(function (row) {
      return row.getAttribute("data-year");
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
      rows.forEach(function (row) {
        var show = row.getAttribute("data-year") === selectedYear;
        row.style.display = show ? "" : "none";
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
