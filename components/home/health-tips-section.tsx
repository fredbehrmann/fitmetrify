import Image from "next/image";

import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";

const tips = [
  {
    title: "Alimente-se bem",
    description:
      "Priorize alimentos integrais, proteínas de qualidade e variedade de nutrientes.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Exercite-se",
    description:
      "Combine treino de força e cardio para melhorar composição corporal e condicionamento.",
    image:
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Hidrate-se",
    description:
      "Beba água ao longo do dia, especialmente antes, durante e após os treinos.",
    image:
      "https://images.unsplash.com/photo-1548839140-5a941f517371?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Durma bem",
    description:
      "O sono de qualidade é essencial para recuperação muscular e regulação hormonal.",
    image:
      "https://images.unsplash.com/photo-1541781774458-bb2af2f05b55?auto=format&fit=crop&w=400&q=80",
  },
];

export function HealthTipsSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Dicas para uma vida mais saudável"
          subtitle="Pequenos hábitos diários que potencializam seus resultados no treino e na nutrição."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {tips.map((tip) => (
            <Card key={tip.title} className="card-hover overflow-hidden py-0">
              <CardContent className="flex flex-col gap-4 p-0 sm:flex-row sm:items-center">
                <div className="relative h-40 w-full shrink-0 sm:h-32 sm:w-40">
                  <Image
                    src={tip.image}
                    alt={tip.title}
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
                <div className="space-y-2 px-6 pb-6 sm:py-6 sm:pr-6 sm:pl-0">
                  <h3 className="text-lg font-semibold">{tip.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
