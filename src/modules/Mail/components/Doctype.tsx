import React from 'react';

export const Doctype = (props: {
	children: React.ReactNode
}) => {
	return (
		<html>
			<head>
				<meta 
					httpEquiv="Content-Type" 
					content="text/html; charset=UTF-8" 
				/>
				<title>E-mail</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
			</head>
			<body>{props.children}</body>
		</html>
	)
}