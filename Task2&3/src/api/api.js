import axios from "axios";
import { APIConfig, Endpoints } from "../config/Api";
import { tokenB2BData, signatureServiceData, balanceInquiryData } from "./data"; // Import data

// Function to fetch the signature from the first API
export const fetchSignature = async () => {
  try {
    const headers = {
      accept: "application/json",
      "X-TIMESTAMP": APIConfig.TIMESTAMP,
      "X-CLIENT-KEY": APIConfig.Client_ID,
      Private_Key: APIConfig.Private_Key,
    };

    const response = await axios.post(Endpoints.SignatureAuth, {}, { headers });
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error fetching signature:", error);
    throw error;
  }
};

// Function to fetch token from the second API (TokenB2B)
export const fetchTokenB2B = async (signature) => {
  try {
    const headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-TIMESTAMP": APIConfig.TIMESTAMP,
      "X-CLIENT-KEY": APIConfig.Client_ID,
      "X-SIGNATURE": signature, // Use the signature from the first request
    };

    const response = await axios.post(Endpoints.TokenB2B, tokenB2BData, {
      headers,
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error fetching token:", error);
    throw error;
  }
};

// Function to fetch signature service using the AccessToken from fetchTokenB2B
export const fetchSignatureService = async (accessToken) => {
  try {
    const headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-TIMESTAMP": APIConfig.TIMESTAMP,
      "X-CLIENT-SECRET": APIConfig.Client_Secret,
      HttpMethod: "POST", // This is assumed as per your cURL
      EndpoinUrl: "/api/v1.0/balance-inquiry", // The URL for the API you're accessing
      AccessToken: accessToken, // Access token passed from fetchTokenB2B response
    };

    const response = await axios.post(
      Endpoints.SignatureService,
      signatureServiceData,
      { headers }
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error fetching signature service:", error);
    throw error;
  }
};

// Function to fetch balance inquiry using AccessToken and X-SIGNATURE
export const fetchBalance = async (accessToken, signature) => {
  try {
    const headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`, // Bearer token from fetchTokenB2B
      "X-TIMESTAMP": APIConfig.TIMESTAMP,
      "X-SIGNATURE": signature, // X-SIGNATURE from fetchSignatureService
      "X-PARTNER-ID": APIConfig.Client_ID,
      "X-EXTERNAL-ID": "41807553358950093184162180797837", // Example value
      "CHANNEL-ID": "95221", // Example value
    };

    const response = await axios.post(
      Endpoints.BalanceInquiry,
      balanceInquiryData,
      { headers }
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error fetching balance inquiry:", error);
    throw error;
  }
};
