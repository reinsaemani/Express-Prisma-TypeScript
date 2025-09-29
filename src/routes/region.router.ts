import { Router } from "express";

const router = Router();

interface RegionResponse<T> {
  data: T[];
}

interface Province {
  code: string;
  name: string;
}

interface Regency {
  code: string;
  name: string;
}

router.get("/provinces", async (req, res) => {
  try {
    const resp = await fetch("https://wilayah.id/api/provinces.json");
    const raw: RegionResponse<Province> = await resp.json();

    const provinces = raw.data.map((p) => ({
      code: p.code,
      name: p.name,
    }));

    res.json(provinces);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch provinces" });
  }
});

router.get("/regencies/:province_code", async (req, res) => {
  try {
    const { province_code } = req.params;
    const resp = await fetch(`https://wilayah.id/api/regencies/${province_code}.json`);
    const raw: RegionResponse<Regency> = await resp.json();

    const regencies = raw.data.map((r) => ({
      id: r.code,
      name: r.name,
    }));

    res.json(regencies);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch regencies" });
  }
});

export default router;
