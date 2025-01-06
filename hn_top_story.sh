#!/bin/bash

# Fetch top story from Hacker News API
top_story_id=$(curl -s "https://hacker-news.firebaseio.com/v0/topstories.json" | jq -r '.[0]')

# Get details of the top story
story_details=$(curl -s "https://hacker-news.firebaseio.com/v0/item/$top_story_id.json")

# Extract and display title, URL, and score
title=$(echo "$story_details" | jq -r '.title')
url=$(echo "$story_details" | jq -r '.url')
score=$(echo "$story_details" | jq -r '.score')

if [ -z "$url" ]; then
    url="https://news.ycombinator.com/item?id=$top_story_id"
fi

echo "Title: $title"
echo "URL: $url"
echo "Points: $score"