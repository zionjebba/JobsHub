import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import LoadingComTwo from "../components/shared/LoadingComTwo";
import { AuthContext } from "../context/AuthProvider";
import Footer from "../components/Footer";

const Applicant = () => {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:5000/all-applications/${user?.email}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch jobs");
                }
                return response.json();
            })
            .then((data) => {
                setJobs(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <LoadingComTwo />;
    }

    if (error) {
        return <h2 className="">{error}</h2>;
    }

    if (jobs === undefined) {
        return <h2 className="">No job found</h2>;
    }

    return (
        <Wrapper>
            <h1>Check out Applications</h1>
            <div className="content-row">
                <StyledTable>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Job Position</th>
                            <th>Company</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job, index) => {
                            let i =
                                index + 1 < 10 ? `0${index + 1}` : index + 1;
                            return (
                                <tr key={job._id}>
                                    <td>{i}</td>
                                    <td>{job.JobPosition}</td>
                                    <td>{job.CompanyName}</td>
                                    <td className="action-row">{job.status}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </StyledTable>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh; /* Changed to min-height to prevent content overflow */
    flex-direction: column;
    background: linear-gradient(rgb(176, 187, 201), rgb(254, 249, 195));
    padding: 20px;

    h1 {
        margin-bottom: 20px;
        font-size: 24px;
        color: #333;
        text-align: center;
    }

    .content-row {
        overflow-x: auto;
        margin-top: 20px;
        width: 100%;
    }
`;

const StyledTable = styled.table`
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    background-color: #fff;

    thead {
        background-color: var(--color-accent);
        color: var(--color-white);
        font-size: 14px;
        letter-spacing: 1px;
        font-weight: 400;
        text-transform: capitalize;
    }

    th,
    td {
        text-align: left;
        padding: 12px;
    }

    tbody tr {
        font-size: 15px;
        font-weight: 400;
        text-transform: capitalize;
        letter-spacing: 1px;
        transition: all 0.2s linear;
    }

    tbody tr:nth-child(even) {
        background-color: #00000011;
    }

    .action-row {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        column-gap: 12px;
    }

    .action-row .action {
        font-size: 21px;
    }

    @media screen and (max-width: 768px) {
        /* Media query for tablets */
        th,
        td {
            padding: 8px;
        }
    }

    @media screen and (max-width: 1024px) {
        /* Media query for laptops */
        th,
        td {
            padding: 10px;
        }
    }
`;

export default Applicant;
