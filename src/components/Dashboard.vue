<template>
  <div class="app-layout">
    <aside class="sidebar">
      <div class="sidebar-logo">
        <div class="logo-icon">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="10" stroke="white" stroke-width="2"/>
            <path d="M7 11l3 3 5-5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="logo-text">GatePass</span>
      </div>

      <nav class="sidebar-nav">
        <ul class="nav-list">
          <li
            v-for="item in mainNavItems"
            :key="item.label"
            class="nav-item"
            :class="{ active: activeNav === item.label }"
            @click="activeNav = item.label"
          >
            <component :is="item.icon" class="nav-icon" />
            <span>{{ item.label }}</span>
          </li>
        </ul>
      </nav>

      <nav class="sidebar-bottom-nav">
        <ul class="nav-list">
          <li
            v-for="item in bottomNavItems"
            :key="item.label"
            class="nav-item"
            :class="{ active: activeNav === item.label }"
            @click="item.label === 'Log Out' ? handleLogout() : activeNav = item.label"
          >
            <component :is="item.icon" class="nav-icon" />
            <span>{{ item.label }}</span>
          </li>
        </ul>
      </nav>
    </aside>

    <div class="main-wrapper">
      <header class="topbar">
        <div class="search-bar">
          <svg class="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="6.5" cy="6.5" r="5.5" stroke="#999" stroke-width="1.5"/>
            <path d="M11 11l3 3" stroke="#999" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <input type="text" placeholder="Search here..." v-model="searchQuery" />
        </div>

        <div class="user-info">
          <div class="user-text">
            <span class="user-name">{{ userName }}</span>
            <span class="user-role">Administrator</span>
          </div>
          <div class="user-avatar">
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
              <circle cx="19" cy="19" r="18" fill="#e0e4ef"/>
              <circle cx="19" cy="15" r="6" fill="#aab0c8"/>
              <path d="M6 33c1.5-7 7-11 13-11s11.5 4 13 11" fill="#aab0c8"/>
            </svg>
          </div>
        </div>
      </header>

      <main class="content">
        <template v-if="activeNav === 'Dashboard'">
          <div class="stat-cards">
            <div
              v-for="card in statCards"
              :key="card.label"
              class="stat-card"
              :class="{ 'stat-card-highlight': card.type === 'pending' }"
            >
              <template v-if="card.type === 'pending'">
                <div class="stat-card-icon" :class="card.type">
                  <component :is="card.icon" />
                </div>
                <div class="stat-card-text">
                  <span class="stat-card-label">{{ card.label }}</span>
                  <div class="stat-card-value">{{ card.value }}</div>
                </div>
              </template>
              <template v-else>
                <div class="stat-card-top">
                  <span class="stat-card-label">{{ card.label }}</span>
                  <div class="stat-card-icon" :class="card.type">
                    <component :is="card.icon" />
                  </div>
                </div>
                <div class="stat-card-value">{{ card.value }}</div>
              </template>
            </div>
          </div>

          <div class="dashboard-panel"></div>
        </template>

        <template v-else-if="activeNav === 'Applicants'">
          <ApplicantsView />
        </template>

        <template v-else-if="activeNav === 'Notifications'">
        </template>
      </main>
    </div>
  </div>
</template>

<script>
import { h } from 'vue'
import ApplicantsView from './Applicants.vue'

const IconDashboard = {
  render() {
    return h('svg', { width: 18, height: 18, viewBox: '0 0 18 18', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
      h('rect', { x: 1, y: 1, width: 7, height: 7, rx: 1.5, fill: 'currentColor' }),
      h('rect', { x: 10, y: 1, width: 7, height: 7, rx: 1.5, fill: 'currentColor' }),
      h('rect', { x: 1, y: 10, width: 7, height: 7, rx: 1.5, fill: 'currentColor' }),
      h('rect', { x: 10, y: 10, width: 7, height: 7, rx: 1.5, fill: 'currentColor' }),
    ])
  }
}

const IconApplicants = {
  render() {
    return h('svg', { width: 18, height: 18, viewBox: '0 0 18 18', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
      h('circle', { cx: 7, cy: 5, r: 3, stroke: 'currentColor', 'stroke-width': 1.8 }),
      h('path', { d: 'M1 16c0-3.314 2.686-6 6-6s6 2.686 6 6', stroke: 'currentColor', 'stroke-width': 1.8, 'stroke-linecap': 'round' }),
      h('circle', { cx: 13, cy: 5, r: 2, stroke: 'currentColor', 'stroke-width': 1.5 }),
      h('path', { d: 'M15 14c0-2.21-1-4-2.5-5', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round' }),
    ])
  }
}

const IconNotifications = {
  render() {
    return h('svg', { width: 18, height: 18, viewBox: '0 0 18 18', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
      h('path', { d: 'M9 2a5 5 0 00-5 5v3l-1.5 2.5h13L14 10V7a5 5 0 00-5-5z', stroke: 'currentColor', 'stroke-width': 1.8, 'stroke-linejoin': 'round' }),
      h('path', { d: 'M7.5 15a1.5 1.5 0 003 0', stroke: 'currentColor', 'stroke-width': 1.8, 'stroke-linecap': 'round' }),
      h('circle', { cx: 13, cy: 3, r: 2.5, fill: '#FF4B55' }),
    ])
  }
}

const IconDatabase = {
  render() {
    return h('svg', { width: 18, height: 18, viewBox: '0 0 18 18', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
      h('ellipse', { cx: 9, cy: 4, rx: 6, ry: 2.2, stroke: 'currentColor', 'stroke-width': 1.6 }),
      h('path', { d: 'M3 4v4c0 1.2 2.7 2.2 6 2.2s6-1 6-2.2V4', stroke: 'currentColor', 'stroke-width': 1.6, 'stroke-linecap': 'round' }),
      h('path', { d: 'M3 8v4c0 1.2 2.7 2.2 6 2.2s6-1 6-2.2V8', stroke: 'currentColor', 'stroke-width': 1.6, 'stroke-linecap': 'round' }),
      h('path', { d: 'M3 12v2c0 1.2 2.7 2.2 6 2.2s6-1 6-2.2v-2', stroke: 'currentColor', 'stroke-width': 1.6, 'stroke-linecap': 'round' }),
    ])
  }
}

const IconSettings = {
  render() {
    return h('svg', { width: 18, height: 18, viewBox: '0 0 18 18', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
      h('circle', { cx: 9, cy: 9, r: 2.5, stroke: 'currentColor', 'stroke-width': 1.8 }),
      h('path', { d: 'M9 2v2M9 14v2M2 9h2M14 9h2M4.22 4.22l1.42 1.42M12.36 12.36l1.42 1.42M4.22 13.78l1.42-1.42M12.36 5.64l1.42-1.42', stroke: 'currentColor', 'stroke-width': 1.8, 'stroke-linecap': 'round' }),
    ])
  }
}

const IconTrash = {
  render() {
    return h('svg', { width: 18, height: 18, viewBox: '0 0 18 18', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
      h('path', { d: 'M3 5h12M7 5V3.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5V5M14 5l-.8 9.6a1 1 0 01-1 .9H5.8a1 1 0 01-1-.9L4 5', stroke: 'currentColor', 'stroke-width': 1.8, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
    ])
  }
}

const IconLogout = {
  render() {
    return h('svg', { width: 18, height: 18, viewBox: '0 0 18 18', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
      h('path', { d: 'M7 3H4a1 1 0 00-1 1v10a1 1 0 001 1h3', stroke: 'currentColor', 'stroke-width': 1.8, 'stroke-linecap': 'round' }),
      h('path', { d: 'M12 12l3-3-3-3M15 9H7', stroke: 'currentColor', 'stroke-width': 1.8, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
    ])
  }
}

const IconHelp = {
  render() {
    return h('svg', { width: 18, height: 18, viewBox: '0 0 18 18', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
      h('circle', { cx: 9, cy: 9, r: 7, stroke: 'currentColor', 'stroke-width': 1.8 }),
      h('path', { d: 'M7 7c0-1.1.9-2 2-2s2 .9 2 2c0 .8-.5 1.5-1.2 1.8L9 11', stroke: 'currentColor', 'stroke-width': 1.8, 'stroke-linecap': 'round' }),
      h('circle', { cx: 9, cy: 13.5, r: 0.8, fill: 'currentColor' }),
    ])
  }
}

// --- Stat card icons ---
const IconAlert = {
  render() {
    return h('svg', { width: 22, height: 22, viewBox: '0 0 22 22', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
      h('path', { d: 'M11 6v6', stroke: 'white', 'stroke-width': 2.2, 'stroke-linecap': 'round' }),
      h('circle', { cx: 11, cy: 15.2, r: 1.1, fill: 'white' }),
    ])
  }
}

const IconCheck = {
  render() {
    return h('svg', { width: 22, height: 22, viewBox: '0 0 22 22', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
      h('path', { d: 'M6 11.5l3.3 3.3L16 7.5', stroke: 'white', 'stroke-width': 2.2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
    ])
  }
}

const IconX = {
  render() {
    return h('svg', { width: 22, height: 22, viewBox: '0 0 22 22', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
      h('path', { d: 'M7 7l8 8M15 7l-8 8', stroke: 'white', 'stroke-width': 2.2, 'stroke-linecap': 'round' }),
    ])
  }
}

const IconPeople = {
  render() {
    return h('svg', { width: 22, height: 22, viewBox: '0 0 22 22', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
      h('circle', { cx: 8, cy: 7, r: 3, stroke: '#1a2560', 'stroke-width': 1.6 }),
      h('path', { d: 'M2 19c0-3.6 2.7-6.5 6-6.5s6 2.9 6 6.5', stroke: '#1a2560', 'stroke-width': 1.6, 'stroke-linecap': 'round' }),
      h('circle', { cx: 15, cy: 6.5, r: 2.3, stroke: '#1a2560', 'stroke-width': 1.4 }),
      h('path', { d: 'M18 19c0-2.9-1.2-5.2-3-6.3', stroke: '#1a2560', 'stroke-width': 1.4, 'stroke-linecap': 'round' }),
    ])
  }
}

export default {
  name: 'GatePassDashboard',
  components: {
    IconDashboard, IconApplicants, IconNotifications, IconDatabase,
    IconSettings, IconTrash, IconLogout, IconHelp,
    IconAlert, IconCheck, IconX, IconPeople,
    ApplicantsView
  },
  data() {
    return {
      activeNav: 'Dashboard',
      searchQuery: '',
      userName: localStorage.getItem('user_name') || 'Name',
      mainNavItems: [
        { label: 'Dashboard', icon: 'IconDashboard' },
        { label: 'Applicants', icon: 'IconApplicants' },
      ],
      bottomNavItems: [
        { label: 'Log Out', icon: 'IconLogout' },
        { label: 'Help', icon: 'IconHelp' },
      ],
      statCards: [
        { label: 'Pending Review', value: 12, type: 'pending', icon: 'IconAlert' },
        { label: 'APPROVED', value: 10, type: 'approved', icon: 'IconCheck' },
        { label: 'RESUBMIT', value: 2, type: 'resubmit', icon: 'IconX' },
        { label: 'TOTAL APPLICANTS', value: 15, type: 'total', icon: 'IconPeople' },
      ]
    }
  },
methods: {
    async handleLogout() {
        try {
            const response = await fetch(
                "http://localhost:4000/api/v1/accounts/logout",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            const data = await response.json();
            console.log(data.message);

            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("user_email");
            localStorage.removeItem("user_name");

            this.$router.push("/login");

        } catch (error) {
            console.error("Logout failed:", error);
        }
    }
}
}
</script>

<style scoped>
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.app-layout {
  display: flex;
  height: 100%;
  width: 100%;
  min-width: 0;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  background: #f0f2f8;
  overflow: hidden;
}

.sidebar {
  width: 200px;
  min-width: 200px;
  flex-shrink: 0;
  background: #2b3ab0;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 22px 18px;
  flex-shrink: 0;
}

.logo-icon {
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.logo-text {
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.2px;
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.sidebar-bottom-nav {
  flex-shrink: 0;
  padding-bottom: 16px;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 11px 18px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 13.5px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  user-select: none;
  white-space: nowrap;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}

.nav-item.active {
  background: #1e2d8a;
  color: #fff;
  font-weight: 700;
}

.nav-icon {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
}

.main-wrapper {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #f0f2f8;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  background: #fff;
  border-bottom: 1px solid #e5e8f0;
  flex-shrink: 0;
  min-width: 0;
  gap: 16px;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  border: 1.5px solid #d8dce8;
  border-radius: 24px;
  padding: 9px 20px;
  flex: 1 1 0;
  max-width: 320px;
  min-width: 0;
}

.search-bar input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 13px;
  color: #444;
  width: 100%;
  min-width: 0;
}

.search-bar input::placeholder {
  color: #b0b5c8;
}

.search-icon {
  flex-shrink: 0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.user-text {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.user-name {
  font-size: 13px;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1.3;
}

.user-role {
  font-size: 11px;
  color: #999;
  line-height: 1.3;
}

.user-avatar svg {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: block;
}

.content {
  flex: 1;
  min-width: 0;
  padding: 22px 24px;
  overflow-y: auto;
  position: relative;
}

.stat-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.stat-card {
  background: #141f6e;
  border-radius: 16px;
  padding: 18px 20px;
  width: 190px;
  min-width: 190px;
  color: #fff;
}

.stat-card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 22px;
}

.stat-card-label {
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: 0.3px;
  line-height: 1.3;
  text-transform: uppercase;
}

.stat-card-icon {
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}

.stat-card-icon.pending {
  background: #e8433f;
}

.stat-card-icon.approved {
  background: #2fa84f;
}

.stat-card-icon.resubmit {
  background: #e8433f;
}

.stat-card-icon.total {
  background: #fff;
}

.stat-card-value {
  font-size: 30px;
  font-weight: 800;
}

.stat-card-highlight {
  background: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
}

.stat-card-highlight .stat-card-icon {
  width: 56px;
  height: 56px;
  min-width: 56px;
}

.stat-card-highlight .stat-card-icon svg {
  width: 30px;
  height: 30px;
}

.stat-card-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-card-highlight .stat-card-label {
  color: #1a1a2e;
  text-transform: none;
  font-size: 13.5px;
}

.stat-card-highlight .stat-card-value {
  color: #1a1a2e;
  font-size: 26px;
}

.dashboard-panel {
  background: #fff;
  border-radius: 20px;
  width: 100%;
  min-height: 280px;
  margin-top: 20px;
}
</style>
