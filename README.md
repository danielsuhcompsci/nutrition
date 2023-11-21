![Nutrition Web App Demo](https://github.com/danielsuhcompsci/nutrition/blob/main/public/demo.gif)

# About

- Web app that displays nutrition info for ~2,000,000 foods
- continously deployed to AWS Elastic Container Service, PostgreSQL database on AWS RDS

## Current Features

- search bar with strict or full-text search
- 'infinite' scrolling with intersection observer api
- page for nutritional information
- barcode scanning (on HTTPS connection)

## WIP Features

- Create food groups to see aggregate nutrient amounts (i.e. meals or nutrition for a week)
- User Authentication
  - saved foods, food groups
  - add food
- Give nutrient information based on recipe
  - based on recipe URL
  - use OCR to automatically add recipe
- Use OCR to scan nutrition facts label
- Give recipe recommendations
- Use vision/vision-language model to give nutritional information about foods in an image
