# Docker Deployment

This project includes Docker support for easy deployment.

## Quick Start

1. **Build and start containers:**
   ```bash
   docker-compose up -d
   ```

2. **View logs:**
   ```bash
   docker-compose logs -f
   ```

3. **Stop containers:**
   ```bash
   docker-compose down
   ```

## Configuration

Environment variables can be set in a `.env` file in the project root:

```
JWT_SECRET=your-production-secret
```

## URLs

- Backend API: http://localhost:4000
- Frontend: http://localhost:4001

## Production Notes

1. Change the JWT_SECRET in production
2. Use a reverse proxy (nginx) for HTTPS
3. Set up proper logging and monitoring
4. Consider using Docker volumes for database persistence
