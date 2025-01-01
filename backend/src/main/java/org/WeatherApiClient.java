package org;

// Import OkHttp classes for making HTTP requests.
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class WeatherApiClient {

    // The OpenWeatherMap API key for authentication.
    private static final String API_KEY = "df8d0bb7c93415bde0e26eff0f02a823";

    // The base URL for the OpenWeatherMap API endpoint to get weather data.
    private static final String BASE_URL = "http://api.openweathermap.org/data/2.5/forecast";

    // This method retrieves the weather data for a zipcode by making an API call.
    // The method takes the zipcode as input and returns the weather information as a JSON string.
    public String getWeather(String zipCode) throws Exception {

        // This is a TEMPORARY ID number
        // Until we figure out how to parse zipcode into id, we will use this.
        int id = 524901;

        // Create a new OkHttpClient instance.
        // This client will manage the network connection and send requests.
        OkHttpClient client = new OkHttpClient();

        // Construct the full URL for the API call by appending query parameters.
        // The query parameters include the zipCode name ("q") and the API key ("appid").
        // Example URL: "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}"
        String url = BASE_URL + "?id=" + id + "&appid=" + API_KEY;

        // Build the HTTP request with the constructed URL.
        // This request is a GET request to retrieve data.
        Request request = new Request.Builder()
                .url(url)  // Set the URL for the request.
                .build();  // Build the request.

        // Use a try-with-resources statement to automatically close the response when done.
        // This ensures the network resources are cleaned up.
        try (Response response = client.newCall(request).execute()) {

            // If the response from the API is not successful (status code 2xx), throw an exception.
            // You can customize this error handling further based on the API response.
            if (!response.isSuccessful()) {
                throw new RuntimeException("Unexpected response: " + response);
            }

            // If the response is successful, return the body of the response as a string.
            // The body contains the weather data in JSON format.
            return response.body().string();
        }
    }
}
