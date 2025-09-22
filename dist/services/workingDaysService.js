"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkingDaysService = void 0;
// src/services/workingDaysService.ts
const luxon_1 = require("luxon");
const holiday_handler_1 = require("../utils/holiday-handler");
// Siempre trabajar en zona horaria de Colombia
luxon_1.Settings.defaultZone = "America/Bogota";
/**
 * Configuración jornada laboral
 */
const WORKING = {
    startHour: 8,
    lunchStartHour: 12,
    lunchEndHour: 13,
    endHour: 17,
};
class WorkingDaysService {
    static async calcWorkingDays(query) {
        const { date, days = 0, hours = 0 } = query;
        if ((days ?? 0) <= 0 && (hours ?? 0) <= 0) {
            throw new Error("InvalidParameters");
        }
        // 1. Traer días festivos antes de calcular
        await (0, holiday_handler_1.fetchHolidays)();
        // 2. Parsear fecha inicial
        let start;
        if (date) {
            start = luxon_1.DateTime.fromISO(date, { zone: "utc" }).setZone("America/Bogota");
        }
        else {
            start = luxon_1.DateTime.now().setZone("America/Bogota");
        }
        // 3. Normalizar la fecha inicial
        let current = this.normalizeInputBackward(start);
        // 4. Sumar días hábiles
        if (days > 0) {
            current = this.addBusinessDaysForward(current, days);
        }
        // 5. Sumar horas hábiles
        if (hours > 0) {
            current = this.addBusinessHoursForward(current, hours);
        }
        // 6. Convertir a UTC antes de devolver
        const resultUtc = current
            .toUTC()
            .toISO({ includeOffset: false, suppressMilliseconds: true }) + "Z";
        return { date: resultUtc };
    }
    /* -------------------------------------------------------------------------- */
    /*                              Métodos privados                              */
    /* -------------------------------------------------------------------------- */
    static isBusinessDay(dt) {
        return dt.weekday >= 1 && dt.weekday <= 5 && !(0, holiday_handler_1.isHoliday)(dt);
    }
    static moveToPreviousBusinessDayEnd(dt) {
        let d = dt.startOf("day");
        do {
            d = d.minus({ days: 1 });
        } while (!this.isBusinessDay(d));
        return d.set({
            hour: WORKING.endHour,
            minute: 0,
            second: 0,
            millisecond: 0,
        });
    }
    static normalizeBusinessDayTimeBackward(d) {
        if (d.hour < WORKING.startHour) {
            return d.set({
                hour: WORKING.startHour,
                minute: 0,
                second: 0,
                millisecond: 0,
            });
        }
        if (d.hour >= WORKING.lunchStartHour && d.hour < WORKING.lunchEndHour) {
            return d.set({
                hour: WORKING.lunchStartHour,
                minute: 0,
                second: 0,
                millisecond: 0,
            });
        }
        if (d.hour >= WORKING.endHour) {
            return d.set({
                hour: WORKING.endHour,
                minute: 0,
                second: 0,
                millisecond: 0,
            });
        }
        return d.set({ second: 0, millisecond: 0 });
    }
    static normalizeInputBackward(dt) {
        return this.isBusinessDay(dt)
            ? this.normalizeBusinessDayTimeBackward(dt)
            : this.moveToPreviousBusinessDayEnd(dt);
    }
    static addBusinessDaysForward(dt, days) {
        let cur = dt;
        let added = 0;
        while (added < days) {
            cur = cur.plus({ days: 1 });
            while (!this.isBusinessDay(cur)) {
                cur = cur.plus({ days: 1 });
            }
            added++;
        }
        return cur;
    }
    static addBusinessHoursForward(dt, hours) {
        let cur = dt;
        let minutesRemaining = Math.round(hours * 60);
        if (!this.isBusinessDay(cur)) {
            cur = cur
                .plus({ days: 1 })
                .set({ hour: WORKING.startHour, minute: 0, second: 0 });
            while (!this.isBusinessDay(cur)) {
                cur = cur.plus({ days: 1 });
            }
        }
        if (cur.hour >= WORKING.lunchStartHour && cur.hour < WORKING.lunchEndHour) {
            cur = cur.set({ hour: WORKING.lunchEndHour, minute: 0, second: 0 });
        }
        while (minutesRemaining > 0) {
            const curMinutes = cur.hour * 60 + cur.minute;
            const blockEndMinutes = cur.hour < WORKING.lunchStartHour
                ? WORKING.lunchStartHour * 60
                : WORKING.endHour * 60;
            const available = blockEndMinutes - curMinutes;
            if (available <= 0) {
                if (cur.hour >= WORKING.lunchStartHour &&
                    cur.hour < WORKING.lunchEndHour) {
                    cur = cur.set({ hour: WORKING.lunchEndHour, minute: 0, second: 0 });
                }
                else {
                    cur = cur
                        .plus({ days: 1 })
                        .set({ hour: WORKING.startHour, minute: 0, second: 0 });
                    while (!this.isBusinessDay(cur)) {
                        cur = cur.plus({ days: 1 });
                    }
                }
                continue;
            }
            const consume = Math.min(available, minutesRemaining);
            cur = cur.plus({ minutes: consume });
            minutesRemaining -= consume;
            if (cur.hour === WORKING.lunchStartHour && cur.minute === 0) {
                cur = cur.set({ hour: WORKING.lunchEndHour, minute: 0, second: 0 });
            }
            else if (cur.hour >= WORKING.endHour && minutesRemaining > 0) {
                cur = cur
                    .plus({ days: 1 })
                    .set({ hour: WORKING.startHour, minute: 0, second: 0 });
                while (!this.isBusinessDay(cur)) {
                    cur = cur.plus({ days: 1 });
                }
            }
        }
        return cur;
    }
}
exports.WorkingDaysService = WorkingDaysService;
//# sourceMappingURL=workingDaysService.js.map