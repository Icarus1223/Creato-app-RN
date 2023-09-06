import React from "react";
import UserAvatar from "react-native-user-avatar";

const Avatar = ({ username, size }) => {
	return (
		<UserAvatar size={size ? size : 35} />
	);
};

export default Avatar;