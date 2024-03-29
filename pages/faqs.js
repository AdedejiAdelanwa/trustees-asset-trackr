import Head from "next/head";
import Link from "next/link";
import React from "react";
import ExternalHeader from "../components/ExternalHeader";
import Footer from "../components/Footer";

const FAQs = () => {
  return (
    <div>
      <Head>
        <title>Asset Tracker | Meristem Trustees</title>
        <meta
          name="description"
          content="Seamlessly track your assets, designate beneficiaries and access estate planning products tailored to your needs."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="font-Poppins text-[1.8rem]">
        <ExternalHeader />
        <div className="w-full h-[182px] px-[10rem] sm:px-[4rem] md:px-[5rem] p-5 bg-[#BBF1D1] ">
          <h1 className="w-[50rem] text-[4.8rem] text-[#008145] sm:w-[32rem] sm:h-[10rem] sm:text-[3rem] sm:mt-[2rem] md:w-[40rem] md:h-[16rem] md:text-[4rem] ">
            Got a question?We’ve got answers
          </h1>
        </div>
        <div className="flex mt-[5rem] justify-between px-[10rem] sm:flex-col sm:px-[4rem] md:px-[5rem] md:flex-col">
          <div className=" w-[33.5rem] sm:flex-col sm:w-[32rem] sm:h-[40rem] sm:px-[3rem] md:flex md:w-[50rem] md:h-[20rem]">
            <div className="w-[33.5rem] mb-10 sm:w-[25rem]">
              <h2 className="mb-3 text-[3.2rem] sm:text-[2.5rem] sm:mb-1 md:mb-2 md:text-[2.9rem]">
                Estate Plans
              </h2>
              <p>
                <u>
                  <h3> When should i establish a trust?</h3>
                </u>
                <p>
                  when you have amassed wealth to an extent, with an intent to
                  transfer it your beneficiaries
                </p>
              </p>
              <br />
              <p>
                <u>
                  <h3> Who owns the property in a Trust.</h3>
                </u>
                <p>
                  By law the assets in a trust are owned by the trustee, however
                  such ownership is restricted by the terms of the trust and
                  legal constraints.
                </p>
              </p>
              <br />
              <p>
                <u>
                  <h3>
                    {" "}
                    What kind of assets are important to establish a trust?
                  </h3>
                </u>
                <p>Everything of value can be put in a trust</p>
              </p>
              <br />
              <p>
                <u>
                  <h3>Can a beneficiary withdraw money from a trust</h3>
                </u>
                <p>
                  A beneficiary can only access the trust fund in accordance
                  with the provision of the trust deed
                </p>
              </p>
              <br />
              <p>
                <u>
                  <h3>Will i have control over a trust i set up</h3>
                </u>
              </p>
              <p>
                <u>
                  <Link href="#">
                    What is the process for transfering assets to beneficiaries?
                  </Link>
                </u>
              </p>
              <p>
                <p>
                  Yes, however the extent of control is as provided by
                  applicable law and the trust deed.
                </p>
              </p>
            </div>
          </div>

          <div className=" w-[33.5rem] sm:flex-col sm:w-[32rem] sm:h-[40rem] sm:px-[3rem] md:flex md:w-[50rem] md:h-[20rem]">
            <div className="w-[33.5rem] mb-10 sm:w-[25rem]">
              <h2 className="mb-3 text-[3.2rem] sm:text-[2.5rem] sm:mb-1 md:mb-2 md:text-[2.9rem]">
                {""}
              </h2>

              <p>
                <u>
                  <h3>
                    {" "}
                    I have a living trust already; do i also need a will?
                  </h3>
                </u>
                <p>
                  This is largely dependent on your estate planning objective
                  and the kind of assets owned, some assets may be suitably
                  planned by writing a will.
                </p>
              </p>
              <br />
              <p>
                <u>
                  <h3>Are the Trustee Subject to Any Rules or Regulations? </h3>
                </u>
                <p>
                  Yes, The Trustee is subject to statutes, common law and
                  judicial pronouncements on the subject of trust
                </p>
              </p>
              <br />
              <p>
                <u>
                  <h3> Can I have multiple trusts?</h3>
                </u>
                <p>
                  Yes, as long as those trust do not touch on the same subject
                  matter.
                </p>
              </p>
              <br />
            </div>

            <div className="w-[335px] mb-10 sm:w-[25rem]">
              <h1 className="mb-3 text-[3.2rem] sm:text-[2.5rem] sm:mb-1 md:mb-2 md:text-[2.9rem]">
                Beneficiaries
              </h1>
              <p>
                <u>
                  <h3>
                    What is the process of transferring assets to beneficiaries?
                  </h3>
                </u>
                <p>Through a Will, a deed of gift or a Trust.</p>
              </p>
              <p>
                <u>
                  <Link href="#">Who is a trustee?</Link>
                </u>
              </p>
            </div>

            <div className="w-[335px] mb-10 sm:w-[25rem]">
              <h1 className="mb-3 text-[3.2rem] sm:text-[2.5rem] sm:mb-1 md:mb-2 md:text-[2.9rem]">
                Assets
              </h1>
              <p>
                <u>
                  <h3>What kind of assets are important to track?</h3>
                </u>
                <p>Everything of value can be put in a trust</p>
              </p>
              <br />
            </div>
          </div>
          {/* second */}
          <div className=" w-[33.5rem] sm:flex-col sm:w-[32rem] sm:h-[40rem] sm:px-[3rem] md:flex md:w-[50rem] md:h-[20rem]">
            <div className="w-[335px] mb-10 sm:w-[25rem]">
              <h1 className="mb-3 text-[3.2rem] sm:text-[2.5rem] sm:mb-1 md:mb-2 md:text-[2.9rem]">
                General
              </h1>
              <p>
                <u>
                  <h3>
                    Why should I set up an asset tracking account when I already
                    have an Estate Plan?
                  </h3>
                </u>
                <p>
                  Our asset tracking service gives you the opportunity to view
                  all your assets, no matter the type and wherever they are. It
                  also gives your beneficiary an idea of what your assets are,
                  and where they may be found. This is relevant for the purpose
                  of processing Letters of Administration for example.
                </p>
              </p>
              <br />
            </div>

            <div className="w-[335px] mb-10 sm:w-[25rem]">
              <h1 className="mb-3 text-[3.2rem] sm:text-[2.5rem] sm:mb-1 md:mb-2 md:text-[2.9rem]">
                Real Estate
              </h1>
              <p>
                <u>
                  <h3> What are Real Estate properties</h3>
                </u>
                <p>
                  Real estate properties include lands and things permanently
                  attached to it, such as houses.
                </p>
              </p>
              <br />
            </div>

            <div className="w-[335px] mb-10 sm:w-[25rem]">
              <h1 className="mb-3 text-[3.2rem] sm:text-[2.5rem] sm:mb-1 md:mb-2 md:text-[2.9rem]">
                Stocks
              </h1>
              <p>
                <u>
                  <h3> What are Stocks </h3>
                </u>
                <p>
                  Stocks are a type of security that gives stockholders a share
                  of ownership in a company. Stocks also are called equities or
                  shares
                </p>
              </p>
              <br />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default FAQs;
