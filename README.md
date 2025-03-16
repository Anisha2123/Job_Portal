# 🚀 Job Board Application  

A **full-stack job board** that **fetches job postings** from platforms like **Naukri.com** and **LinkedIn Jobs** and displays them in a dynamic UI.  
Users can **search, filter, and apply** for jobs with ease.  

---

## 🎯 Features  

✅ **Real-time job crawling** from Naukri/LinkedIn  
✅ **Search bar** to find relevant jobs  
✅ **Filters** for location, experience, and category  
✅ **Pagination** for improved performance  
✅ **Job details page** with an "Apply" button  
✅ **Responsive UI** for all devices  
✅ **Auto-refresh jobs every 24 hours** (Bonus)  

---

## 🏗 Tech Stack  

### **Frontend:**  
🚀 **React** (TypeScript, TailwindCSS)  
⚡ **Vite** (Fast Development)  

### **Backend:**  
🌐 **Node.js & Express.js**  
🗄 **MongoDB Atlas** (Database)  
🔍 **Cheerio / Puppeteer** (Web Scraping)  

### **Deployment:**  
🖥 **Frontend:** Vercel  
🌍 **Backend:** Render  
📊 **Database:** MongoDB Atlas  

---

## 🚀 Live Demo  

🔗 **[Live Application](https://job-portal-orcin-delta.vercel.app/)**  
🔗 **[GitHub Repository](https://github.com/Anisha2123/Job_Portal/)**  
🔗 **[Backend](https://job-portal-54lt.onrender.com/)**

---

## 📦 Installation & Setup  

### **1️⃣ Clone the repository**  

git clone YOUR_GITHUB_REPO_LINK
cd job-board

2️⃣ Setup Backend
cd backend
npm install
npm start

📌 Runs on http://localhost:5000

3️⃣ Setup Frontend
cd frontend
npm install
npm run dev

📌 Runs on http://localhost:5173

📡 API Endpoints
1️⃣ Get All Jobs

GET /api/jobs/saved?page=1&limit=10
GET /jobs
GET fetchJobsFromAPI()

📌 Filters Supported:

title → Search job title
experience → Filter by experience (e.g., "Fresher", "3 years")
location → Filter by job location
category → Filter by category (e.g., "Software Engineer")

Example Response:

{
  "jobs": [
    {
      "title": "Software Engineer",
      "company": "Google",
      "location": "Bangalore",
      "experience": "2+ years",
      "applyLink": "https://google.com"
    }
  ],
  "totalJobs": 200,
  "totalPages": 20,
  "currentPage": 1
}


🎯 Additional Features & Improvements
✅ Infinite scrolling / pagination for better performance
✅ Search bar for filtering job titles
✅ Auto-refresh job data every 24 hours
✅ Minimal UI for better experience

🎨 UI Screenshots
![image](https://github.com/user-attachments/assets/ff7550a9-0064-498b-86a2-5874b8ffeb2b)
![image](https://github.com/user-attachments/assets/04c09349-d319-4775-8930-dc269496c8dc)



📜 Contributing
Want to improve the project? Feel free to fork and raise a PR!

git clone YOUR_GITHUB_REPO
git checkout -b feature-branch
git commit -m "New Feature Added"
git push origin feature-branch

📩 Contact
📧 Your Email: birlaani@gmail.com
🔗 LinkedIn: https://www.linkedin.com/in/anishabirla/
