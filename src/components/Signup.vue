<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { API_BASE_URL } from "../config/api.js";

const router = useRouter();
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMsg = ref("");
const loading = ref(false);

const handleSignup = async () => {
  errorMsg.value = "";

  if (!email.value || !password.value || !confirmPassword.value) {
    errorMsg.value = "Please fill in all fields";
    return;
  }

  if (password.value !== confirmPassword.value) {
    errorMsg.value = "Passwords do not match";
    return;
  }

  loading.value = true;

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/accounts/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      },
    );

    const data = await response.json();

    if (response.ok) {
      alert("Account created successfully!");
      email.value = "";
      password.value = "";
      confirmPassword.value = "";
      router.push("/login");
    } else {
      errorMsg.value = data.message;
    }
  } catch (error) {
    console.error(error);
    errorMsg.value = "Unable to connect to the server.";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="auth-page-matched">
    <div class="card-container">
      <!-- Logo / brand row -->
      <div class="app-brand">
        <svg
          class="brand-logo"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="16"
            cy="16"
            r="15"
            fill="none"
            stroke="#233d90"
            stroke-width="3"
          />
          <path
            d="M16 5 A11 11 0 0 1 16 27"
            fill="none"
            stroke="#233d90"
            stroke-width="3"
            stroke-linecap="round"
          />
        </svg>
        <span class="brand-name">Ateneo de Naga GatePass</span>
      </div>

      <div class="card-body">
        <!-- Left: illustration + heading -->
        <div class="brand-side">
          <div class="illustration-wrap">
            <svg
              viewBox="0 0 280 220"
              class="illustration"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="190" cy="100" r="80" fill="#eef2ff" />
              <rect
                x="40"
                y="20"
                width="110"
                height="170"
                rx="14"
                fill="#233d90"
              />
              <rect
                x="50"
                y="34"
                width="90"
                height="120"
                rx="4"
                fill="#ffffff"
              />
              <circle cx="95" cy="46" r="10" fill="#233d90" />
              <path
                d="M75 80 L95 60 L115 80"
                stroke="#233d90"
                stroke-width="4"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <rect
                x="200"
                y="40"
                width="36"
                height="40"
                rx="4"
                fill="#233d90"
              />
              <text
                x="218"
                y="66"
                font-size="20"
                fill="#ffffff"
                text-anchor="middle"
                font-family="sans-serif"
                font-weight="bold"
              >
                P
              </text>
              <path
                d="M235 55 Q250 55 250 70"
                stroke="#233d90"
                stroke-width="3"
                fill="none"
                stroke-linecap="round"
                opacity="0.5"
              />
              <path
                d="M240 60 Q252 60 252 70"
                stroke="#233d90"
                stroke-width="3"
                fill="none"
                stroke-linecap="round"
                opacity="0.7"
              />
              <g>
                <rect
                  x="120"
                  y="130"
                  width="120"
                  height="50"
                  rx="10"
                  fill="#3b5bdb"
                />
                <rect
                  x="135"
                  y="118"
                  width="90"
                  height="25"
                  rx="8"
                  fill="#3b5bdb"
                />
                <circle cx="145" cy="182" r="12" fill="#1e293b" />
                <circle cx="225" cy="182" r="12" fill="#1e293b" />
              </g>
              <g>
                <circle cx="70" cy="150" r="10" fill="#1e293b" />
                <rect
                  x="60"
                  y="160"
                  width="22"
                  height="40"
                  rx="6"
                  fill="#233d90"
                />
                <line
                  x1="71"
                  y1="170"
                  x2="95"
                  y2="140"
                  stroke="#233d90"
                  stroke-width="6"
                  stroke-linecap="round"
                />
              </g>
            </svg>
          </div>
          <h1>Create new account</h1>
          <p>Sign up to get started</p>
        </div>

        <!-- Right: form -->
        <div class="form-side">
          <form @submit.prevent="handleSignup" class="auth-form">
            <div v-if="errorMsg" class="error-banner" role="alert">
              {{ errorMsg }}
            </div>

            <div class="input-field-group">
              <label for="email">Email</label>
              <input
                id="email"
                type="email"
                v-model.trim="email"
                placeholder="name@gmail.com"
                :disabled="loading"
                required
              />
            </div>

            <div class="input-field-group">
              <label for="password">Password</label>
              <input
                id="password"
                type="password"
                v-model="password"
                placeholder="Enter your password"
                :disabled="loading"
                required
              />
            </div>

            <div class="input-field-group">
              <label for="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                v-model="confirmPassword"
                placeholder="Confirm your password"
                :disabled="loading"
                required
              />
            </div>

            <button type="submit" class="action-btn" :disabled="loading">
              <span v-if="loading">Processing...</span>
              <span v-else>Sign Up</span>
            </button>

            <div class="redirect-footer">
              Already have account?
              <router-link to="/login">Sign In</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-page-matched {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0a1958 0%, #3b5bdb 100%);
  padding: 30px;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

.card-container {
  width: 940px;
  max-width: 100%;
  background: #ffffff;
  border-radius: 20px;
  padding: 40px 50px 50px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

.app-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
}

.brand-logo {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.brand-name {
  font-weight: 700;
  font-size: 1.4rem;
  color: #1e293b;
}

.card-body {
  display: flex;
  gap: 50px;
  align-items: center;
}

/* Left side */
.brand-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.illustration-wrap {
  width: 100%;
  max-width: 280px;
  margin-bottom: 16px;
}

.illustration {
  width: 100%;
  height: auto;
}

.brand-side h1 {
  color: #1e293b;
  font-size: 1.75rem;
  font-weight: 700;
  margin: 4px 0 4px;
}

.brand-side p {
  color: #64748b;
  font-size: 0.95rem;
  margin: 0;
}

/* Right side form */
.form-side {
  flex: 1;
}

.auth-form {
  width: 100%;
}

.error-banner {
  background: #fee2e2;
  border: 1px solid #fca5a5;
  color: #991b1b;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 0.875rem;
}

.input-field-group {
  margin-bottom: 24px;
}

.input-field-group label {
  display: block;
  color: #1e293b;
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.input-field-group input {
  width: 100%;
  padding: 8px 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid #cbd5e1;
  color: #1e293b;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease;
}

.input-field-group input::placeholder {
  color: #94a3b8;
}

.input-field-group input:focus {
  border-bottom-color: #233d90;
}

.action-btn {
  width: 100%;
  padding: 14px;
  background: #233d90;
  border: none;
  border-radius: 12px;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.2s ease;
}

.action-btn:hover:not(:disabled) {
  background: #1d3175;
}

.action-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.redirect-footer {
  text-align: center;
  margin-top: 20px;
  font-size: 0.875rem;
  color: #64748b;
}

.redirect-footer a {
  color: #2563eb;
  text-decoration: none;
  font-weight: 600;
}

.redirect-footer a:hover {
  text-decoration: underline;
}

@media (max-width: 720px) {
  .card-body {
    flex-direction: column;
  }
  .card-container {
    padding: 30px 24px 40px;
  }
}
</style>
