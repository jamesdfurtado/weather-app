package org;

public class Main {
    public static void main(String[] args) {

        WeatherApiClient client = new WeatherApiClient();
        try {
            String weatherData = client.getWeather("02881");
            System.out.println(weatherData);
        } catch (Exception e) {
            e.printStackTrace();
        }

        // Next, parse JSON response into usable data
    }
}
