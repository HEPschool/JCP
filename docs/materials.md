---
layout: default
permalink: /materials/
title: Materials
hero:
  image: "/assets/img/heros/books.jpg"  # Optional
  title: "Materials"
---
# Materials

If you require access to the encrypted materials, please contact the author.

<div class="year-filter">
  <button id="materials-prev-toggle" class="btn small year-filter-btn" type="button"
          aria-expanded="false" aria-controls="materials-year-filter">Select year</button>
  <span id="materials-current-year" class="year-filter-current" aria-live="polite"></span>
</div>
<div id="materials-year-filter" class="year-scroll" hidden></div>
<p id="materials-empty" class="year-filter-empty" hidden>No materials available for the selected year.</p>

<ul id="materials-list">
  {% assign mats = site.data.materials | sort: "date" %}
  {% for m in mats %}
    {% assign href = m.file %}
    {% assign ext = href | split: "." | last | upcase %}
    {% case ext %}
      {% when "NB" %}
        {% assign download_label = "Notebook" %}
      {% when "PPT" %}
        {% assign download_label = "PPT" %}
      {% when "PPTX" %}
        {% assign download_label = "PPTX" %}
      {% else %}
        {% assign download_label = ext %}
    {% endcase %}
    <li data-year="{{ m.date | date: '%Y' }}">
      <strong>{{ m.date }} - {{ m.title }}</strong> - {{ m.speaker }}
      {% if href contains '://' %}
        [ <a href="{{href}}" target="_blank" rel="noopener">{{ download_label }}</a> ]
      {% else %}
        [ <a href="{{href | relative_url}}" target="_blank" rel="noopener">{{ download_label }}</a> ]
      {% endif %}
    </li>
  {% endfor %}
</ul>

<script>
  (function () {
    var currentYear = String(new Date().getFullYear());
    var filterRoot = document.getElementById("materials-year-filter");
    var toggleBtn = document.getElementById("materials-prev-toggle");
    var currentYearText = document.getElementById("materials-current-year");
    var list = document.getElementById("materials-list");
    var emptyNote = document.getElementById("materials-empty");
    if (!filterRoot || !list || !toggleBtn || !currentYearText) return;

    var items = Array.prototype.slice.call(list.querySelectorAll("li[data-year]"));
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
