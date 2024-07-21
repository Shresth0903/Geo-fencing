# Geofence Notification System

## Overview

The Geofence Notification System is a web application that tracks user locations and sends email notifications based on their presence within a defined geofence. The back-end is built using Flask, SQLAlchemy, and GeoAlchemy2, with email notifications handled via Flask-Mail. The front-end is developed using React.js.

## Features

- RESTful APIs for geofence checks.
- Email notifications sent based on geofence status.
- Location data stored and managed in a PostgreSQL database.
- Geospatial data handling with GeoAlchemy2.
- Export of geofence data to Excel files.
- Modern front-end interface built with React.js.
- User-friendly forms for input and result display.
- Integration with a PostgreSQL database for data storage and retrieval.

## Installation

### Prerequisites

- Python 3.x
- Node.js and npm
- PostgreSQL

### Back-End Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/geofence-notification-system.git
   cd geofence-notification-system/backend
