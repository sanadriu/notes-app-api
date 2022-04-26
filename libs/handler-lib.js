export default function handler(lambda) {
	return async function (event, context) {
		const headers = {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": true,
		};

		try {
			const { statusCode, ...result } = await lambda(event, context);

			return {
				headers,
				statusCode,
				body: JSON.stringify(result),
			};
		} catch (error) {
			return {
				headers,
				statusCode: 500,
				body: JSON.stringify({ success: false, message: error.message }),
			};
		}
	};
}
