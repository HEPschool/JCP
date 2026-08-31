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

{% include meeting_schedule.html
   items=site.events
   id_prefix="schedule"
   context_key="location"
   context_label="Location"
   empty_message="No events available for the selected year." %}
