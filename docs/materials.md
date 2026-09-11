---
layout: default
permalink: /materials/
title: Materials
hero:
  image: "/assets/img/heros/books.jpg"  # Optional
  title: "Materials"
---
# Materials

You can view the event details by clicking a title. If you require access to the encrypted materials, please contact the author.

<div class="year-filter">
  <button id="materials-prev-toggle" class="btn small year-filter-btn" type="button"
          aria-expanded="false" aria-controls="materials-year-filter">Select year</button>
  <span id="materials-current-year" class="year-filter-current" aria-live="polite"></span>
</div>
<div id="materials-year-filter" class="year-scroll" hidden></div>
<p id="materials-empty" class="year-filter-empty" hidden>No materials available for the selected year.</p>

<div id="materials-list" class="materials-list">
  {% assign lectures = site.data.materials | sort: "date" %}
  {% for lecture in lectures %}
    {% assign event_page = site.events | where: "event_id", lecture.event_id | first %}
    {% assign hero_image = event_page.hero.image | default: "" | strip %}
    <article class="card material-card" data-year="{{ lecture.date | date: '%Y' }}">
      <header class="material-card-header{% if hero_image != '' %} has-hero{% endif %}"{% if hero_image != '' %} style="--material-card-hero: url('{{ hero_image | relative_url }}');"{% endif %}>
        <time class="material-card-date" datetime="{{ lecture.date | date: '%Y-%m-%d' }}">
          {{ lecture.date | date: "%Y.%m.%d (%a)" }}
        </time>
        <h2 class="material-card-title">
          {% if event_page %}
            <a href="{{ event_page.url | relative_url }}">{{ lecture.title }}</a>
          {% else %}
            {{ lecture.title }}
          {% endif %}
        </h2>
        <p class="material-card-speaker"><strong>Speaker:</strong> {{ lecture.speaker }}</p>
      </header>

      <div class="material-card-resources">
        <strong>Materials</strong>
        <div class="buttons material-card-links">
          {% for material in lecture.materials %}
            {% assign href = material.file %}
            {% if href contains '://' %}
              <a class="btn small" href="{{ href }}" target="_blank" rel="noopener">{{ material.title }}</a>
            {% else %}
              <a class="btn small" href="{{ href | relative_url }}" target="_blank" rel="noopener">{{ material.title }}</a>
            {% endif %}
          {% endfor %}
        </div>
      </div>
    </article>
  {% endfor %}
</div>

<script>
  (function () {
    var currentYear = String(new Date().getFullYear());
    var filterRoot = document.getElementById("materials-year-filter");
    var toggleBtn = document.getElementById("materials-prev-toggle");
    var currentYearText = document.getElementById("materials-current-year");
    var list = document.getElementById("materials-list");
    var emptyNote = document.getElementById("materials-empty");
    if (!filterRoot || !list || !toggleBtn || !currentYearText) return;

    var items = Array.prototype.slice.call(list.querySelectorAll(".material-card[data-year]"));
    var years = Array.from(new Set(items.map(function (item) {
      return item.getAttribute("data-year");
    }).filter(Boolean))).sort(function (a, b) {
      return Number(b) - Number(a);
    });
    if (years.indexOf(currentYear) === -1) {
      years.push(currentYear);
      years.sort(function (a, b) {
        return Number(b) - Number(a);
      });
    }

    var selectedYear = currentYear;

    function applyFilter() {
      var visibleCount = 0;
      items.forEach(function (item) {
        var show = item.getAttribute("data-year") === selectedYear;
        item.style.display = show ? "" : "none";
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
        button.setAttribute("aria-pressed", String(year === selectedYear));
        button.addEventListener("click", function () {
          selectedYear = year;
          renderYearButtons();
          applyFilter();
        });
        filterRoot.appendChild(button);
      });
    }

    toggleBtn.addEventListener("click", function () {
      var willOpen = filterRoot.hidden;
      filterRoot.hidden = !willOpen;
      toggleBtn.setAttribute("aria-expanded", String(willOpen));
    });

    renderYearButtons();
    applyFilter();
  })();
</script>
