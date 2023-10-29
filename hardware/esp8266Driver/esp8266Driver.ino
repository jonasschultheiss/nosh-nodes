#include <Adafruit_MCP3008.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

// Replace these with your WiFi credentials
const char *ssid = "your_wifi_ssid";
const char *password = "your_wifi_password";

// Replace with your REST API endpoint
const char *apiEndpoint = "http://example.com/api/data";

Adafruit_MCP3008 adc;

void setup() {
  Serial.begin(115200);
  delay(10);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  if (!adc.begin(0)) {
    Serial.println("Couldn't find MCP3004, make sure it's wired correctly!");
    while (1);
  }
}

void loop() {
  // Read values from all 4 channels of the MCP3004 ADC
  for (int channel = 0; channel < 4; channel++) {
    uint16_t adcValue = adc.readADC(channel);
    Serial.print("Channel ");
    Serial.print(channel);
    Serial.print(" ADC Value: ");
    Serial.println(adcValue);

    // Send the ADC value over WiFi
    sendValueOverWiFi(channel, adcValue);

    delay(1000);
  }
}

void sendValueOverWiFi(int channel, uint16_t value) {
  // Create WiFiClient object to maintain the connection to the server
  WiFiClient client;

  // Your API endpoint and HTTP method (POST in this case)
  HTTPClient http;
  http.begin(client, apiEndpoint);

  // Add headers
  http.addHeader("Content-Type", "application/json");

  // Create a JSON payload with the channel and ADC value
  String jsonPayload = "{\"channel\":" + String(channel) + ",\"value\":" + String(value) + "}";

  // Send the POST request with the JSON payload
  int httpResponseCode = http.POST(jsonPayload);

  // Check the response
  if (httpResponseCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
  } else {
    Serial.print("Error on HTTP request: ");
    Serial.println(httpResponseCode);
  }

  // Free resources
  http.end();
}
