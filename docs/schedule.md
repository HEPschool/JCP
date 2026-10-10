---
layout: default
permalink: /schedule/
title: Schedule
hero:
  image: "/assets/img/heros/schedule.jpg"
  title: "Schedule"
---
# Schedule

You can view the event details by clicking a title. <br>
Select a Series to explore the series.

{% include meeting_schedule.html
   items=site.events
   id_prefix="schedule"
   context_key="location"
   context_label="Location"
   empty_message="No events available for the selected year." %}
