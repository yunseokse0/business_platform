import type { NextApiRequest } from "next";

type Bucket = { tokens: number; lastRefill: number };

const buckets = new Map<string, Bucket>();

export function ipRateLimiter({
	capacity = 20,
	refillPerSec = 10,
	key = (req: NextApiRequest) => req.headers["x-forwarded-for"]?.toString() || req.socket.remoteAddress || "unknown",
}: {
	capacity?: number;
	refillPerSec?: number;
	key?: (req: NextApiRequest) => string;
}) {
	return function limit(req: NextApiRequest) {
		const k = key(req);
		const now = Date.now();
		let bucket = buckets.get(k);
		if (!bucket) {
			bucket = { tokens: capacity, lastRefill: now };
			buckets.set(k, bucket);
		}
		// Refill
		const elapsedSec = (now - bucket.lastRefill) / 1000;
		const refill = Math.floor(elapsedSec * refillPerSec);
		if (refill > 0) {
			bucket.tokens = Math.min(capacity, bucket.tokens + refill);
			bucket.lastRefill = now;
		}
		// Consume
		if (bucket.tokens <= 0) {
			const err: any = new Error("Too Many Requests");
			err.status = 429;
			throw err;
		}
		bucket.tokens -= 1;
	};
}


