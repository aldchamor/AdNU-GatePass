<template>
  <div class="applicants-wrapper">

    <!-- ===================== LIST VIEW ===================== -->
    <template v-if="!selectedApplicant">
      <div class="search-row">
        <div class="search-pill">
          <div class="search-icon-circle">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <circle cx="7.5" cy="7.5" r="6" stroke="white" stroke-width="2"/>
              <path d="M12 12l4 4" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <input type="text" placeholder="Search here..." v-model="searchQuery" />
          <div class="count-badge">{{ filteredApplicants.length }}</div>
        </div>
      </div>

      <div class="table-section">
        <h2 class="table-title">APPLICANTS</h2>

        <div class="table">
          <div class="table-row header-row">
            <div class="col-id">ID</div>
            <div class="col-datetime">DATE / TIME</div>
            <div class="col-name">NAME</div>
            <div class="col-actions-header">ACTIONS</div>
          </div>

          <div
            v-for="applicant in filteredApplicants"
            :key="applicant.id"
            class="table-row data-row"
          >
            <div class="col-id">{{ applicant.id }}</div>
            <div class="col-datetime">{{ applicant.date }}</div>
            <div class="col-name">{{ applicant.name }}</div>
            <div class="col-actions">
              <button class="action-btn view-btn" @click="viewApplicant(applicant)">VIEW</button>
              <button
                class="action-btn approve-btn"
                :class="{ approved: applicant.status === 'Approved', rejected: applicant.status === 'Rejected' }"
                @click="toggleApprove(applicant)"
              >
                {{ applicant.status === 'Approved' ? 'APPROVED' : applicant.status === 'Rejected' ? 'REJECTED' : 'APPROVE' }}
              </button>
              <button class="action-btn delete-btn" @click="deleteApplicant(applicant.id)">DELETE</button>
            </div>
          </div>

          <div v-if="filteredApplicants.length === 0" class="empty-state">
            No applicants found.
          </div>
        </div>
      </div>
    </template>

    <!-- ===================== DETAIL VIEW ===================== -->
    <template v-else>
      <div class="search-row detail-search-row">
        <div class="search-pill">
          <div class="search-icon-circle">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <circle cx="7.5" cy="7.5" r="6" stroke="white" stroke-width="2"/>
              <path d="M12 12l4 4" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <input type="text" placeholder="Search here..." v-model="searchQuery" disabled />
        </div>
        <button class="back-btn" @click="closeView">&larr; Back</button>
      </div>

      <div class="profile-row">
        <img
          class="profile-avatar"
          :src="selectedApplicant.avatar || defaultAvatar"
          alt="avatar"
        />
        <div class="profile-name-block">
          <div class="profile-name">{{ selectedApplicant.name }}</div>
          <div class="profile-role">Applicant</div>
        </div>
      </div>

      <div class="detail-grid">
        <div class="detail-column">
          <h3 class="detail-heading">Information</h3>

          <label class="detail-label">Email</label>
          <input class="detail-input" type="email" v-model="selectedApplicant.email" />

          <label class="detail-label">First Name</label>
          <input class="detail-input" type="text" v-model="selectedApplicant.firstName" />

          <label class="detail-label">Last Name</label>
          <input class="detail-input" type="text" v-model="selectedApplicant.lastName" />

          <label class="detail-label">Contact Number</label>
          <input class="detail-input" type="text" v-model="selectedApplicant.contactNumber" />

          <label class="detail-label">Affiliate</label>
          <input class="detail-input" type="text" v-model="selectedApplicant.affiliate" />
        </div>

        <div class="detail-column">
          <h3 class="detail-heading">Vehicles</h3>

          <label class="detail-label">Type of Vehicle</label>
          <input class="detail-input" type="text" v-model="selectedApplicant.vehicleType" />

          <label class="detail-label">Plate Number</label>
          <input class="detail-input" type="text" v-model="selectedApplicant.plateNumber" />

          <label class="detail-label">Year Model / Make</label>
          <input class="detail-input" type="text" v-model="selectedApplicant.yearModel" />

          <label class="detail-label">Driver's License (if different)</label>
          <input class="detail-input" type="text" v-model="selectedApplicant.driversLicense" />

          <label class="detail-label">Gatepass Access Type</label>
          <select class="detail-input" v-model="selectedApplicant.gatepassAccessType">
            <option value="">Select...</option>
            <option value="Full Access">Full Access</option>
            <option value="Limited Access">Limited Access</option>
            <option value="Visitor">Visitor</option>
            <option value="Temporary">Temporary</option>
          </select>
        </div>
      </div>

      <div class="detail-actions">
        <button class="action-btn save-btn" @click="saveApplicant">SAVE</button>
        <button class="action-btn cancel-btn" @click="closeView">CANCEL</button>
      </div>
    </template>

  </div>
</template>

<script>
export default {
  name: 'ApplicantsView',
  data() {
    return {
      searchQuery: '',
      selectedApplicant: null,
      defaultAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=NA',
      applicants: [
        {
          id: 2,
          date: '2026-07-01 11:02 AM',
          name: 'Miguel Torres',
          status: 'Pending',
          email: 'miguel.torres@example.com',
          firstName: 'Miguel',
          lastName: 'Torres',
          contactNumber: '0928-555-7890',
          affiliate: 'Logistics Partner',
          vehicleType: 'Pickup Truck',
          plateNumber: 'XYZ-5678',
          yearModel: '2019 Ford Ranger',
          driversLicense: 'N01-23-456789',
          gatepassAccessType: 'Limited Access',
          avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Miguel+Torres'
        },
        {
          id: 3,
          date: '2026-07-02 02:41 PM',
          name: 'Ana Reyes',
          status: 'Rejected',
          email: 'ana.reyes@example.com',
          firstName: 'Ana',
          lastName: 'Reyes',
          contactNumber: '0999-222-3344',
          affiliate: 'Visitor',
          vehicleType: 'Motorcycle',
          plateNumber: 'MTR-9012',
          yearModel: '2020 Honda Click',
          driversLicense: '',
          gatepassAccessType: 'Visitor',
          avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Ana+Reyes'
        },
        {
          id: 4,
          date: '2026-07-02 04:15 PM',
          name: 'David Lee',
          status: 'Pending',
          email: 'david.lee@example.com',
          firstName: 'David',
          lastName: 'Lee',
          contactNumber: '0915-888-1122',
          affiliate: 'Contractor',
          vehicleType: 'Van',
          plateNumber: 'VAN-3456',
          yearModel: '2018 Nissan NV350',
          driversLicense: 'N02-98-765432',
          gatepassAccessType: 'Temporary',
          avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=David+Lee'
        }
      ]
    }
  },
  computed: {
    filteredApplicants() {
      const q = this.searchQuery.toLowerCase()
      return this.applicants.filter(a =>
        a.name.toLowerCase().includes(q) || String(a.id).includes(q)
      )
    }
  },
  methods: {
    viewApplicant(applicant) {
      // Ensure detail fields exist even if the source record doesn't have them yet
      const detailFields = [
        'email', 'firstName', 'lastName', 'contactNumber', 'affiliate',
        'vehicleType', 'plateNumber', 'yearModel', 'driversLicense', 'gatepassAccessType'
      ]
      detailFields.forEach(field => {
        if (!(field in applicant)) applicant[field] = ''
      })
      this.selectedApplicant = applicant
    },
    closeView() {
      this.selectedApplicant = null
    },
    saveApplicant() {
      // Hook up to your API call here (e.g. this.$axios.put(...))
      this.closeView()
    },
    toggleApprove(applicant) {
      if (applicant.status === 'Approved') {
        applicant.status = 'Rejected'
      } else {
        applicant.status = 'Approved'
      }
    },
    deleteApplicant(id) {
      this.applicants = this.applicants.filter(a => a.id !== id)
    }
  }
}
</script>

<style scoped>
.applicants-wrapper {
  width: 100%;
  padding: 0;
}

.search-row {
  display: flex;
  align-items: center;
  margin-bottom: 28px;
}

.detail-search-row {
  justify-content: space-between;
  gap: 16px;
}

.search-pill {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  border: 1.5px solid #e0e4ef;
  border-radius: 30px;
  padding: 6px 10px 6px 6px;
  width: 100%;
  max-width: 420px;
}

.search-icon-circle {
  width: 34px;
  height: 34px;
  min-width: 34px;
  border-radius: 50%;
  background: #2b3ab0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.search-pill input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 13px;
  color: #333;
  flex: 1;
  min-width: 0;
}

.search-pill input::placeholder {
  color: #a8adc2;
}

.count-badge {
  background: #fff;
  border: 1.5px dashed #c6cbe0;
  border-radius: 30px;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 700;
  color: #1a1a2e;
  min-width: 36px;
  text-align: center;
  flex-shrink: 0;
}

.back-btn {
  border: 1.5px dashed #c6cbe0;
  border-radius: 30px;
  background: #fff;
  padding: 9px 20px;
  font-size: 12.5px;
  font-weight: 700;
  color: #333;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  flex-shrink: 0;
}

.back-btn:hover {
  background: #2b3ab0;
  color: #fff;
  border-color: #2b3ab0;
}

.table-section {
  width: 100%;
}

.table-title {
  font-size: 13px;
  font-weight: 800;
  color: #1a1a2e;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
}

.table {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.table-row {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.col-id {
  background: #fff;
  border: 1.5px solid #d8dce8;
  border-radius: 30px;
  padding: 10px 0;
  min-width: 60px;
  max-width: 70px;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: #1a1a2e;
  flex-shrink: 0;
}

.col-datetime {
  background: #fff;
  border: 1.5px solid #d8dce8;
  border-radius: 30px;
  padding: 10px 16px;
  min-width: 130px;
  max-width: 160px;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: #1a1a2e;
  flex-shrink: 0;
}

.col-name {
  background: #fff;
  border: 1.5px solid #d8dce8;
  border-radius: 30px;
  padding: 10px 20px;
  flex: 1;
  font-size: 13px;
  font-weight: 500;
  color: #1a1a2e;
  text-align: center;
}

.col-actions-header {
  background: #fff;
  border: 1.5px solid #d8dce8;
  border-radius: 30px;
  padding: 10px 40px;
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: 0.3px;
  color: #555;
  text-align: center;
  flex-shrink: 0;
}

.col-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  align-items: center;
}

.header-row .col-id,
.header-row .col-datetime,
.header-row .col-name {
  font-weight: 700;
  font-size: 12.5px;
  letter-spacing: 0.3px;
  color: #555;
}

.action-btn {
  border: 1.5px dashed #c6cbe0;
  border-radius: 30px;
  background: #fff;
  padding: 7px 14px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  letter-spacing: 0.3px;
  color: #333;
}

.view-btn:hover {
  background: #2b3ab0;
  color: #fff;
  border-color: #2b3ab0;
}

.approve-btn:hover {
  background: #22c55e;
  color: #fff;
  border-color: #22c55e;
}

.approve-btn.approved {
  background: #22c55e;
  color: #fff;
  border-color: #22c55e;
}

.approve-btn.rejected {
  background: #ef4444;
  color: #fff;
  border-color: #ef4444;
}

.delete-btn:hover {
  background: #ef4444;
  color: #fff;
  border-color: #ef4444;
}

.empty-state {
  text-align: center;
  padding: 30px;
  color: #aaa;
  font-size: 13px;
}

/* ===================== DETAIL VIEW STYLES ===================== */

.profile-row {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 30px;
}

.profile-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  background: #eee;
}

.profile-name {
  font-size: 16px;
  font-weight: 800;
  color: #2b3ab0;
}

.profile-role {
  font-size: 12.5px;
  color: #8a8fa3;
  font-weight: 500;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
}

.detail-heading {
  font-size: 16px;
  font-weight: 800;
  color: #1a1a2e;
  margin: 0 0 18px 0;
}

.detail-label {
  display: block;
  font-size: 12.5px;
  font-weight: 600;
  color: #444;
  margin-bottom: 6px;
  margin-top: 16px;
}

.detail-label:first-of-type {
  margin-top: 0;
}

.detail-input {
  width: 100%;
  box-sizing: border-box;
  border: 1.5px solid #d8dce8;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 13px;
  color: #1a1a2e;
  background: #fff;
  outline: none;
  transition: border-color 0.15s;
}

.detail-input:focus {
  border-color: #2b3ab0;
}

select.detail-input {
  appearance: none;
  cursor: pointer;
}

.detail-actions {
  display: flex;
  gap: 12px;
  margin-top: 36px;
}

.save-btn {
  background: #2b3ab0;
  color: #fff;
  border-color: #2b3ab0;
  padding: 9px 24px;
}

.save-btn:hover {
  background: #202b8c;
}

.cancel-btn:hover {
  background: #f1f2f6;
}

@media (max-width: 700px) {
  .detail-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>
