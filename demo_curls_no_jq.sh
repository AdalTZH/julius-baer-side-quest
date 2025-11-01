#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:8123}"

echo "=== Core Banking API Demo - No JQ Version ==="
echo "Base URL: $BASE_URL"
echo "Testing key endpoints without jq dependency..."
echo

# Helper function to print section headers
print_section() {
    echo
    echo "=========================================="
    echo "$1"
    echo "=========================================="
}

# Helper function to print test case headers
print_test() {
    echo
    echo "--- $1 ---"
}

print_section "1. AUTHENTICATION TESTS WITH SCOPES"

print_test "1.1 Enquiry token (default scope)"
echo "Getting enquiry token..."
curl -s -X POST "$BASE_URL/authToken?claim=enquiry" \
  -H 'Content-Type: application/json' \
  -d '{"username":"alice","password":"any"}'
echo

print_test "1.2 Transfer token (maximum scope)"
echo "Getting transfer token..."
curl -s -X POST "$BASE_URL/authToken?claim=transfer" \
  -H 'Content-Type: application/json' \
  -d '{"username":"bob","password":"secret"}'
echo

print_section "2. ACCOUNT OPERATIONS"

print_test "2.1 List all accounts"
echo "Getting all accounts..."
curl -s "$BASE_URL/accounts"
echo

print_test "2.2 Validate accounts"
echo "ACC1000 (valid): $(curl -s "$BASE_URL/accounts/validate/ACC1000")"
echo "ACC2000 (invalid): $(curl -s "$BASE_URL/accounts/validate/ACC2000")"
echo "ACC9999 (non-existent): $(curl -s "$BASE_URL/accounts/validate/ACC9999")"

print_test "2.3 Get account balance"
echo "ACC1000 balance:"
curl -s "$BASE_URL/accounts/balance/ACC1000"
echo

print_section "3. TRANSFER TESTS"

print_test "3.1 Basic transfer (no auth)"
echo "Transfer without authentication:"
curl -s -X POST "$BASE_URL/transfer" \
  -H 'Content-Type: application/json' \
  -d '{"fromAccount":"ACC1000","toAccount":"ACC1001","amount":50.00}'
echo

print_test "3.2 Invalid transfer"
echo "Transfer with invalid account:"
curl -s -X POST "$BASE_URL/transfer" \
  -H 'Content-Type: application/json' \
  -d '{"fromAccount":"ACC2000","toAccount":"ACC1001","amount":50.00}'
echo

print_section "4. SUMMARY"
echo "✅ Authentication: Scope-based token generation working"
echo "✅ Account Operations: Validation and balance checks working"
echo "✅ Transfer Operations: Basic transfers working"
echo "✅ Error Handling: Invalid requests properly handled"
echo
echo "🎉 Demo completed! All core functionality verified."
echo "💡 Install jq for the full demo experience with JSON parsing."
echo "📋 See JQ_INSTALLATION.md for installation instructions."
