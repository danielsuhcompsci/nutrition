# About

- Web app that displays nutrition info for ~2,000,000 foods
- continously deployed to AWS Elastic Container Service

## Current Features

- search bar with strict or full-text search
- page for nutritional information
- barcode scanning (on HTTPS connection)

## WIP Features

- Create food groups to see aggregate nutrient amounts (i.e. meals or nutrition for a week)
- User Authentication
  - saved foods, food groups
  - add food
- Give nutrient information based on recipe
  - based on recipe URL
- Use object detection model (YOLOv8) to give nutritional information about foods in an image

# Architecture

- Web Container (Fargate) with ALB

- Server Container (Fargate) with ALB

- PostgreSQL Instance (AWS Relational Database Service)
