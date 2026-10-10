(function () {
  "use strict";

  var openEnds = ["", "present", "ongoing", "tbd", "미정"];

  function dateValue(value) {
    var text = String(value == null ? "" : value).trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return null;
    var date = new Date(text + "T00:00:00Z");
    return !isNaN(date.getTime()) && date.toISOString().slice(0, 10) === text ? text : null;
  }

  function todayInKST(now) {
    return new Date(now.getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
  }

  function getStatus(start, end, today) {
    start = dateValue(start);
    today = dateValue(today);
    var endText = String(end == null ? "" : end).trim().toLowerCase();
    var isOpen = openEnds.indexOf(endText) !== -1;
    end = isOpen ? null : dateValue(endText);
    if (!start || !today || (!isOpen && (!end || end < start))) return null;
    if (start > today) return "upcoming";
    if (isOpen || end >= today) return "ongoing";
    return "past";
  }

  function compareSeries(a, b, status) {
    var aDate = status === "past" ? a.end : a.start;
    var bDate = status === "past" ? b.end : b.start;
    if (aDate !== bDate) {
      var order = aDate < bDate ? -1 : 1;
      return status === "past" ? -order : order;
    }
    return a.title.localeCompare(b.title) || a.id.localeCompare(b.id);
  }

  // The same date rules can be checked with Node without a browser dependency.
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { getStatus: getStatus, compareSeries: compareSeries, todayInKST: todayInKST };
    return;
  }

  var view = document.querySelector("[data-series-view]");
  if (!view) return;

  function refresh() {
    var today = todayInKST(new Date());
    var groups = {};
    Array.prototype.forEach.call(view.querySelectorAll("[data-series-group]"), function (section) {
      groups[section.getAttribute("data-series-group")] = {
        list: section.querySelector("[data-series-list]"),
        empty: section.querySelector("[data-series-empty]"),
        items: []
      };
    });

    Array.prototype.forEach.call(view.querySelectorAll("[data-series-card]"), function (card) {
      var item = {
        element: card,
        start: card.getAttribute("data-start"),
        end: card.getAttribute("data-end"),
        title: card.getAttribute("data-title"),
        id: card.getAttribute("data-series-id")
      };
      var status = getStatus(item.start, item.end, today);
      if (status && groups[status]) groups[status].items.push(item);
    });

    Object.keys(groups).forEach(function (status) {
      var group = groups[status];
      group.items.sort(function (a, b) { return compareSeries(a, b, status); });
      group.items.forEach(function (item) { group.list.appendChild(item.element); });
      group.empty.hidden = group.list.children.length > 0;
    });
  }

  refresh();
  window.addEventListener("pageshow", refresh);
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) refresh();
  });
}());
