import React from "react";
import UserAvatar from "react-native-user-avatar";

const Avatar = ({ username, size, avatar }) => {
	return (
		<UserAvatar size={size ? size : 35} name={username ? username : ''} src={avatar ? avatar : ''} />
	);
};

export default Avatar;