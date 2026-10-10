---
layout: default
permalink: /series/
title: Series
hero:
  image: "/assets/img/heros/series.jpg"
  title: "Series"
---
# Series

Select a card to learn about each series.

<div data-series-view>
  {% include series_group.html status="ongoing" title="Ongoing Series" empty_message="No series are currently in progress." %}
  {% include series_group.html status="upcoming" title="Upcoming Series" empty_message="No upcoming series have been announced." %}
  {% include series_group.html status="past" title="Past Series" empty_message="No past series are available." %}
</div>

<script src="{{ '/assets/js/series.js' | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>
