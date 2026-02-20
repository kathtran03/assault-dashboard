# assault-dashboard

I used AI in this assignment for debugging only. I did not use AI to write or complete any components where AI use is prohibited. If AI was used for debugging or development, I am able to explain the relevant code and decisions.

This dashboard visualizes the assault crime data in Seattle in 2020 using an interactive proportional map to provide a powerful visual representation of crime density across the city.  The size of each circle on the map corresponds to the number of assault incidents in that area, allowing users to quickly identify hotspots and patterns. The dashboard also includes a bar chart that displays the top 5 neighborhoods with the most assault crimes, for easy comparison. This interactive feature enables users to explore crime trends in different areas of Seattle and gain insights into the distribution of assault incidents throughout the city.
# Seattle Assault Crime Dashboard (2020)

## Web Map URL

https://kathtran03.github.io/assault-dashboard

---

## Project Description

This project is an interactive web mapping dashboard that visualizes aggravated assault incidents in Seattle in 2020. The size of each circle on the map corresponds to the number of assault incidents in that area, allowing users to quickly identify hotspots and patterns. The dashboard also includes a bar chart that displays the top 5 neighborhoods with the most assault crimes, for seamless comparison. This interactive feature enables users to explore crime trends in different areas of Seattle and gain insights into the distribution of assault incidents throughout the city.

---

## Thematic Map Type 

### Proportional Symbol Map

I chose a proportional symbol map because the dataset consists of individual point locations representing aggravated assault incidents. A proportional symbol map preserves the exact geographic location of each crime event while visually representing density through symbol size and clustering.

I chose this map type because:

- The data are point-based rather than aggregated by area.
- It allows users to identify crime hotspots at multiple zoom levels.
- Clustering improves readability at small scales while maintaining spatial accuracy when zoomed in.

Using proportional symbols provides a clearer representation of spatial distribution compared to a choropleth map, which would require grouping crimes by neighborhood boundaries and potentially masking localized patterns.

---

## Additional Data Visualization Components

This dashboard includes at least two additional visualization elements:

### 1. Dynamic Bar Chart

- Displays the top five neighborhoods with the highest number of aggravated assaults within the current map view.
- Updates automatically when users zoom or pan the map.
- Supports comparison between neighborhoods.

### 2. Dynamic Assault Count

- Displays the total number of assaults within the current visible map extent.
- Updates in real time as the map view changes.

### 3. Interactive Popups

- Clicking a crime point displays detailed information including neighborhood and report number.
- Enhances user interaction and exploratory analysis.

---

## Data Source

Seattle Police Department Crime Data (2008–Present)  
Filtered to aggravated assault incidents in 2020.
https://data.seattle.gov/Public-Safety/SPD-Crime-Data-2008-Present/tazs-3rd5/data_preview
