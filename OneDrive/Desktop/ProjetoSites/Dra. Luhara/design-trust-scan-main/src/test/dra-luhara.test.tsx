import { describe, expect, it } from "vitest";
import { ADDRESS, PHONE, PHONE_DISPLAY, WHATSAPP, INSTAGRAM, LOCATION_REF } from "@/components/site";

describe("Dados institucionais da Dra. Luhara Carvalho", () => {
  it("contém as informações corretas de contato e endereço", () => {
    expect(ADDRESS).toContain("Avenida Tancredo Neves, 747");
    expect(ADDRESS).toContain("Cuiabá — MT");
    expect(ADDRESS).toContain("CEP 78070-122");
    expect(LOCATION_REF).toBe("Espaço Saúde Odontologia, Estética e Bem-Estar");
    expect(PHONE_DISPLAY).toBe("(65) 99922-0212");
    expect(PHONE).toBe("tel:+5565999220212");
    expect(WHATSAPP).toContain("5565999220212");
    expect(WHATSAPP).toContain("Luhara");
    expect(INSTAGRAM).toBe("https://www.instagram.com/draluharacarvalho/");
  });

  it("não contém dados da antiga profissional", () => {
    expect(WHATSAPP).not.toContain("993394833");
    expect(ADDRESS).not.toContain("Quarenta e Quatro");
    expect(INSTAGRAM).not.toContain("dramichellyramos");
  });
});
