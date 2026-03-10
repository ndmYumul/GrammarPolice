# Grammar Checker Application

A full-stack web application that uses AI to check grammar in user messages. Built with Django REST Framework and React, powered by Google's Gemini AI.

## Features

- **User Authentication**: Secure registration and login system with JWT tokens
- **AI Grammar Checking**: Real-time grammar checking powered by Google Gemini 2.0 Flash
- **Conversation Management**: Save and manage conversation history
- **Modern UI**: Responsive React frontend with Redux state management

## Tech Stack

### Backend

- **Django 6.0.3**: Web framework
- **Django REST Framework**: API development
- **djangorestframework-simplejwt**: JWT authentication
- **django-cors-headers**: CORS handling
- **Google Gemini AI**: AI-powered grammar checking
- **SQLite**: Database (default)

### Frontend

- **React 19**: UI library
- **Redux Toolkit**: State management
- **React Redux**: React bindings for Redux
- **Axios**: HTTP client (for API calls)

## Project Structure

```
├── backend/
│   ├── manage.py
│   ├── backend/           # Django project settings
│   ├── authentications/   # User authentication app
│   ├── conversations/     # Conversation and message management
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── redux/         # Redux store and slices
│   │   ├── screens/       # Main screens (Login, Register, Home)
│   │   └── App.js
│   └── package.json
└── README.md
```

## Prerequisites

- Python 3.8+
- Node.js 14+
- npm or yarn
- Google Gemini API key

## Installation

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create a virtual environment:

```bash
python -m venv venv
```

3. Activate the virtual environment:
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. Install dependencies:

```bash
pip install -r requirements.txt
```

5. Create a `.env` file in the backend directory with the following variables:

```env
SECRET_KEY=your-django-secret-key-here
DEBUG=True
GEMINI_API_KEY=your-gemini-api-key-here
```

6. Run migrations:

```bash
python manage.py migrate
```

7. Create a superuser (optional):

```bash
python manage.py createsuperuser
```

8. Start the development server:

```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## Environment Variables

### Backend (.env)

- `SECRET_KEY`: Django secret key for security
- `DEBUG`: Set to `True` for development, `False` for production
- `GEMINI_API_KEY`: Your Google Gemini API key

## API Endpoints

### Authentication

- `POST /api/auth/register/` - Register a new user
- `POST /api/auth/login/` - Login and get JWT token

### Conversations

- `GET /api/v1/conversations/` - Get all conversations
- `GET /api/v1/conversations/<id>/` - Get specific conversation
- `POST /api/v1/chat/` - Send message for grammar checking

## Usage

1. Start both backend and frontend servers
2. Navigate to `http://localhost:3000`
3. Register a new account or login
4. Start typing messages to check grammar
5. View conversation history and corrections

## Development

### Running Tests

Backend:

```bash
cd backend
python manage.py test
```

Frontend:

```bash
cd frontend
npm test
```

### Code Formatting

Backend:

```bash
black .
flake8 .
```

Frontend:

```bash
npm run lint
```

## Deployment

### Backend

1. Set `DEBUG=False` in `.env`
2. Configure `ALLOWED_HOSTS` in settings.py
3. Set up a production database (PostgreSQL recommended)
4. Collect static files: `python manage.py collectstatic`
5. Deploy using services like Heroku, AWS, or DigitalOcean

### Frontend

1. Build the production bundle:

```bash
npm run build
```

2. Deploy the `build` folder to services like Netlify, Vercel, or AWS S3

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please open an issue on the GitHub repository.
