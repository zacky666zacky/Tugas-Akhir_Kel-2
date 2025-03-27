import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import {
  fetchBalance,
  fetchSignature,
  fetchSignatureService,
  fetchTokenB2B,
} from "../api/api";
import "./asset.css";
const Informasi = () => {
  const [balances, setBalances] = useState([]);
  const [name, setName] = useState(""); // State for name
  const [accountNo, setAccountNo] = useState(""); // State for account number
  const [partnerReferenceNo, setPartnerReferenceNo] = useState(""); // State for partner reference number
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    try {
      const signatureResponse = await fetchSignature();
      const tokenResponse = await fetchTokenB2B(signatureResponse.signature);
      const signatureServiceResponse = await fetchSignatureService(
        tokenResponse.accessToken
      );

      // Fetch balance using the access token and signature
      const balanceResponse = await fetchBalance(
        tokenResponse.accessToken,
        signatureServiceResponse.signature
      );

      console.log("Fourth API Response (Balance):", balanceResponse);

      // Populate the balances state with accountInfos from the response
      setBalances(balanceResponse.accountInfos);
      setName(balanceResponse.name); // Set the name from the response
      setAccountNo(balanceResponse.accountNo); // Set the account number
      setPartnerReferenceNo(balanceResponse.partnerReferenceNo); // Set the partner reference number
    } catch (error) {
      console.error("Error making requests:", error);
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  };

  // Use useEffect to fetch data when the component is mounted
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="container mt-5 mb-5">
      <div className="text-center my-4">
        <h2 className="font-weight-bold">Informasi Saldo</h2>
        <p>Nama : {name}</p> {/* Display the name */}
        <p>Account No : {accountNo}</p> {/* Display the account number */}
        <p>Partner Reference No : {partnerReferenceNo}</p>{" "}
        {/* Display the partner reference number */}
      </div>
      <button
        className="btn mb-4 bg-blue-500"
        style={{
          background: "#ffb200",
          borderColor: "#ffb200",
          color: "white",
        }}
        onClick={fetchData}
      >
        {loading ? "Loading..." : "Check Saldo"}
      </button>
      {loading && <p>Loading...</p>} {/* Show loading indicator */}
      {balances.map((balance, index) => (
        <div
          key={index}
          className="mb-4 p-3 border rounded shadow-sm fade-in" // Add the fade-in class here
        >
          <h3 className="font-weight-bold">
            Balance Type: {balance.balanceType}
          </h3>
          <p>Status: {balance.status}</p>
          <p>Registration Status Code: {balance.registrationStatusCode}</p>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Account Info</th>
                <th>Value</th>
                <th>Currency</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Amount</td>
                <td>{balance.amount.value}</td>
                <td>{balance.amount.currency}</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Float Amount</td>
                <td>{balance.floatAmount.value}</td>
                <td>{balance.floatAmount.currency}</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Hold Amount</td>
                <td>{balance.holdAmount.value}</td>
                <td>{balance.holdAmount.currency}</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Available Balance</td>
                <td>{balance.availableBalance.value}</td>
                <td>{balance.availableBalance.currency}</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Ledger Balance</td>
                <td>{balance.ledgerBalance.value}</td>
                <td>{balance.ledgerBalance.currency}</td>
              </tr>
              <tr>
                <td>6</td>
                <td>Current Multilateral Limit</td>
                <td>{balance.currentMultilateralLimit.value}</td>
                <td>{balance.currentMultilateralLimit.currency}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      ))}
    </div>
  );
};

export default Informasi;
