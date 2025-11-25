import React from "react";

export default function ProfessionalsSection() {
  return (
    <div className="w-full flex justify-center py-16 px-4 bg-white">
      <div className="w-full max-w-[1440px]">

        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-[#003B15] mb-12">
          The Professionals Behind Our Services
        </h2>

        {/* Engineers Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 items-start">
          <div className="order-2 md:order-1">
            <img
              src="/images/A1.jpg"
              alt="Engineer with drone"
              className="rounded-2xl w-full max-w-[538px] object-cover"
            />
          </div>
          <div className="order-1 md:order-2 xl:space-y-6">
            <h3 className="text-2xl font-[500px] text-[#003B15] underline decoration-[#003B15] decoration-2 underline-offset-4">
              Engineers dedicated to working with
            </h3>
            <p className="text-[#003B15] font-[400px] leading-relaxed">
              Our operational excellence is guaranteed by highly experienced <br/>
              Engineers, each holding B.Sc. or M.Sc. degrees, who lead every<br/>
              phase of the Krishi Alo project.
            </p>
            <p className="text-[#003B15] font-[400px] leading-relaxed">
              They manage essential foundational work, from initial surveying<br/>
              and soil testing to accurate full digital field mapping.
            </p>
            <p className="text-[#003B15] font-[400px] leading-relaxed">
              This team implements the technology and maintains critical<br/>
              technical leadership, translating complex data into actionable<br/>
              strategies that drive project success.
            </p>
          </div>
        </div>

        {/* Sub-Assistant Engineers Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 items-start rounded-2xl p-8">
          <div className="xl:space-y-6">
            <h3 className="text-2xl font-[500px] text-[#003B15] underline decoration-[#003B15]decoration-2 underline-offset-4">
              Implementation by Sub-Assistant Engineers
            </h3>
            <p className="text-[#003B15] font-[400px] leading-relaxed">
              Implementation Sub-Assistant Engineers (S.A.E.s) are Diploma in<br/>
              Engineering students or recent graduates engaged in industrial
              training,<br/> internships, or entry-level jobs.
            </p>
            <p className="text-[#003B15] font-[400px] leading-relaxed">
              They are fully dedicated to field work for Agri-Tech projects,
              serving as the<br/> frontline team responsible for translating
              engineering designs into<br/> functional systems on the ground.
            </p>
            <p className="text-[#003B15] font-[400px] leading-relaxed">
              Their work centers on the installation and maintenance of IoT<br/>
              infrastructure (including sensors, surveillance, and networking)
              and<br/> providing technical support for smart cropping and precision
              agriculture systems.
            </p>
          </div>
          <div>
            <img
              src="/images/A2.jpg"
              alt="Engineers working in field"
              className="rounded-2xl w-full max-w-[538px] object-cover"
            />
          </div>
        </div>

        {/* Operators Section */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <img
              src="/images/A3.jpg"
              alt="Technical operators team"
              className="rounded-2xl w-full max-w-[538px] object-cover"
            />
          </div>
          <div className="xl:space-y-6">
            <h3 className="text-2xl font-[500px] text-[#003B15] underline decoration-[#003B15] decoration-2 underline-offset-4">
              Need Help? Operators Here.
            </h3>
            <p className="text-[#003B15] font-[400px] leading-relaxed">
              Need Help? Operators Here. Facing a technical snag, or require immediate<br/>
              assistance on the ground?
            </p>
            <p className="text-[#003B15] font-[400px] leading-relaxed">
              Our dedicated team of Technical Operators is ready and available to<br/>
              provide expert support. We are here to ensure your operations run<br/>
              smoothly and efficiently.
            </p>
            <p className="text-[#003B15] font-[400px] leading-relaxed">
              We can assist with: On-site troubleshooting and diagnostics, system<br/>
              checks and maintenance, and resolving operational queries. Contact us<br/>
              directly for rapid response and resolution.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
