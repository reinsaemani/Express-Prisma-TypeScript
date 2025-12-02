import cron from 'node-cron';
import { closeExpiredVacancies } from '../services/vacancies.service';

// Jalankan setiap hari jam 00:05 WIB
cron.schedule('5 0 * * *', async () => {
  try {
    const closed = await closeExpiredVacancies();
    if (closed > 0) {
      console.log(`[CRON] Closed ${closed} expired vacancies at ${new Date().toISOString()}`);
    } else {
      console.log(`[CRON] No expired vacancies to close at ${new Date().toISOString()}`);
    }
  } catch (error) {
    console.error('[CRON ERROR] Failed to close expired vacancies:', error);
  }
});
