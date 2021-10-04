import 'regenerator-runtime/runtime';
import {getYear, getMonth} from "./functions";

test("Return year with four digits", () => {    
    expect(getYear("2021-01-02")).toBe("2021")
});

test("Return month in full name", () => {    
    expect(getMonth("2021-06-02")).toBe("June");
});