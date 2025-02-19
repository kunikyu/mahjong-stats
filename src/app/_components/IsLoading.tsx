"use client";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const IsLoading: React.FC = () => {
    return (
        <div className="flex h-screen items-center justify-center">
            <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        </div>
    );
};

export default IsLoading;
