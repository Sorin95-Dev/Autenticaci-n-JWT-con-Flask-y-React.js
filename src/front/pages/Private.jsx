import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Private = () => {
    const { store, dispatch } = useGlobalReducer();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchPrivateData = async () => {
            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL;
                if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file");

                const response = await fetch(backendUrl + "/api/private", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                });

                if (response.status === 401 || response.status === 422) {
                    dispatch({ type: "logout" });
                    navigate("/login");
                    return;
                }

                const data = await response.json();
                if (response.ok) {
                    setUserData(data.user);
                } else {
                    setError(data.message || "Error fetching private data");
                }
            } catch (err) {
                setError("Could not connect to the server.");
            }
        };

        fetchPrivateData();
    }, []);

    const handleLogout = () => {
        dispatch({ type: "logout" });
        navigate("/");
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow text-center">
                        <div className="card-body p-5">
                            <h2 className="card-title mb-3">Private Area</h2>
                            <p className="text-muted mb-4">
                                Welcome! You are successfully authenticated.
                            </p>

                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            {userData && (
                                <div className="alert alert-success">
                                    <strong>Logged in as:</strong> {userData.email}
                                </div>
                            )}

                            <button
                                className="btn btn-danger mt-3"
                                onClick={handleLogout}
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
