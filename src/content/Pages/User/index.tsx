import React, {FC, useCallback, useEffect, useState} from 'react';
import {Card, Typography, Box} from "@mui/material";
import {getUsers} from "../../../api/getUsers";

interface UserPageProps {}

const UserPage: FC<UserPageProps> = ({}) => {
    const [users, setUsers] = useState<any>(null);

    const fetchUsers = useCallback(async () => {
        try {
            const response = await getUsers();
            setUsers(response);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    if (users === null || users === undefined) {
        return <div>Loading...</div>;
    }

    console.log('aaa', users)

    return (
        <Card sx={{
            m:2, p:2
        }}>
            <Typography variant="h6" align="center" sx={{ pt: 2 }}>
                Users
            </Typography>
            <Box>
                {users.map((user: any, index: number) => (
                    <Box key={index} sx={{ p: 1 }}>
                        <Typography variant="body1">
                            {user.name}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Card>
    );
};
export default UserPage;
