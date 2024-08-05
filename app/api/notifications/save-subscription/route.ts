import { saveSubscriptionToDatabase } from "@/lib/server-noti";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const subscription = await request.json();

  //   if (!isValidSaveRequest(req, res)) {
  //     return;
  //   }

  /**** START save-sub-api-save-subscription ****/
  try {
    const id = await saveSubscriptionToDatabase(subscription);
    // console.log(id);

    return NextResponse.json(id);
  } catch (e) {
    // console.log(e);
    return NextResponse.json(
      {},
      {
        status: 400,
      }
    );
  }
}

// const isValidSaveRequest = (req, res : NextResponse) => {
//     // Check the request body has at least an endpoint.
//     if (!req.body || !req.body.endpoint) {
//       // Not a valid subscription.
//       res.status(400);
//       res.setHeader("Content-Type", "application/json");
//       res.send(
//         JSON.stringify({
//           error: {
//             id: "no-endpoint",
//             message: "Subscription must have an endpoint.",
//           },
//         }),
//       );
//       return false;
//     }
//     return true;
//   };
