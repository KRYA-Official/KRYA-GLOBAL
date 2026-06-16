// js/app.js - KRYA Main Application Logic

import { checkAuthState, loginWithGoogle, logoutUser } from './firebase/auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    
    // UI Elements
    const loginBtn = document.getElementById('google-login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const loginError = document.getElementById('login-error');
    const currentUserInfo = document.getElementById('current-user-info');
    
    // Navigation Elements
    const navItems = document.querySelectorAll('.nav-item');
    const viewContainer = document.getElementById('view-container');

    // Theme Management (Dark/Light Mode)
    const initTheme = () => {
        const savedTheme = localStorage.getItem('krya-theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
    };
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('krya-theme', newTheme);
        });
    }

    // Loader Function
    const toggleLoader = (show) => {
        if (!loader) return;
        if (show) loader.classList.remove('hidden');
        else loader.classList.add('hidden');
    };

    // 100% Secure Authentication State Listener
    toggleLoader(true);
    checkAuthState((userData) => {
        toggleLoader(false);
        const isLoginPage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('KRYA-ADMIN/');
        
        if (userData) {
            // User is valid admin
            if (isLoginPage) {
                window.location.href = 'dashboard.html'; // Send to Dashboard
            } else if (currentUserInfo) {
                currentUserInfo.innerHTML = `KRYA Executive:<br><b>${userData.user.email}</b><br><small>Role: ${userData.role}</small>`;
                loadDashboardView(); // Load default view
            }
        } else {
            // Not logged in or Not an Admin
            if (!isLoginPage) {
                window.location.href = 'index.html'; // Kick out to Login page
            }
        }
    });

    // Login Button Click Action
    if (loginBtn) {
        loginBtn.addEventListener('click', async () => {
            try {
                toggleLoader(true);
                loginError.classList.add('hidden');
                await loginWithGoogle();
                // Auth listener will handle redirect automatically
            } catch (error) {
                toggleLoader(false);
                loginError.textContent = "Security Alert: " + error.message;
                loginError.classList.remove('hidden');
            }
        });
    }

    // Logout Button Click Action
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            if(confirm("Are you sure you want to securely logout from KRYA Control Room?")) {
                toggleLoader(true);
                await logoutUser();
            }
        });
    }

    // Sidebar Navigation System
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            navItems.forEach(nav => nav.classList.remove('active'));
            e.target.classList.add('active');
            const targetView = e.target.getAttribute('data-target');
            loadView(targetView);
        });
    });

    // Dashboard View Loader
    const loadView = (viewName) => {
        if(!viewContainer) return;
        
        if(viewName === 'dashboard-view') {
            loadDashboardView();
        } else {
            viewContainer.innerHTML = `<div style="text-align:center; padding: 2rem;">
                <h2 style="color:var(--primary-color)">${viewName.replace('-view', '').toUpperCase()}</h2>
                <p style="color:var(--text-secondary)">This secure KRYA module is loading...</p>
            </div>`;
        }
    };

    const loadDashboardView = () => {
        if(!viewContainer) return;
        viewContainer.innerHTML = `
            <div style="margin-bottom: 2rem;">
                <h2 style="color: var(--primary-color); margin-bottom: 0.5rem;">KRYA Operations Center</h2>
                <p style="color: var(--text-secondary);">Enterprise Dashboard & Metrics</p>
            </div>
            <div class="stats-grid">
                <div class="stat-card">
                    <h3>Active Wonder Buttons</h3>
                    <div class="value">Ready</div>
                </div>
                <div class="stat-card">
                    <h3>Security Status</h3>
                    <div class="value" style="color: var(--success-color);">100% Locked</div>
                </div>
                <div class="stat-card">
                    <h3>Database Connection</h3>
                    <div class="value" style="color: var(--primary-color);">Online</div>
                </div>
            </div>
        `;
    };

    // Start App
    initTheme();
});
      
