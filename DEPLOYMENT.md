# Deployment Guide

## GitHub Pages Setup

This project is configured to automatically deploy to GitHub Pages using GitHub Actions. Follow these steps to set up deployment:

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** > **Pages**
3. Under **Source**, select **GitHub Actions**
4. The workflow will automatically trigger on pushes to the `main` branch

### 2. Repository Settings

Make sure your repository has the following settings:

- The default branch is named `main`
- GitHub Actions are enabled
- Pages are enabled with "GitHub Actions" as the source

### 3. Workflow Overview

The CI/CD pipeline (`ci-cd.yml`) includes two jobs:

#### Test Job

- Runs on every push and pull request
- Installs dependencies
- Runs ESLint for code quality
- Executes tests with Vitest
- Builds the project
- Uploads build artifacts

#### Deploy Job

- Only runs on pushes to the `main` branch
- Requires the test job to pass first
- Builds the project for production
- Configures the base path for GitHub Pages
- Deploys to GitHub Pages

### 4. Base Path Configuration

The project is configured to handle GitHub Pages base paths automatically:

- **Development**: Base path is `/`
- **Production**: Base path is `/your-repo-name/`

This is handled by the `VITE_BASE_URL` environment variable in the workflow.

### 5. SPA Routing

The `public/404.html` file handles client-side routing for single-page applications on GitHub Pages. This ensures that direct links to your app routes work correctly.

### 6. Manual Deployment

If you need to deploy manually:

```bash
# Build the project
npm run build

# The built files will be in the `dist/` directory
# You can manually upload these to any static hosting service
```

### 7. Environment Variables

The workflow uses the following environment variables:

- `VITE_BASE_URL`: Set to the repository name for proper asset loading

### 8. Troubleshooting

**Common Issues:**

1. **404 errors on page refresh**: The `404.html` file should handle this automatically
2. **Assets not loading**: Check that the base path is correctly set
3. **Build failures**: Check the Actions tab for detailed error logs
4. **Permission errors**: Ensure GitHub Actions has permission to deploy to Pages

**Checking Deployment Status:**

1. Go to **Actions** tab in your repository
2. Click on the latest workflow run
3. Check both the "Test" and "Deploy" job logs

Your site will be available at: `https://yourusername.github.io/your-repo-name/`

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Run linter
npm run lint

# Build for production
npm run build
```
